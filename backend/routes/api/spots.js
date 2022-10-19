const express = require('express')
const { Spot, User, Image, Review, Booking } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { Op, Sequelize } = require('sequelize')
const { validateSpot, validateBooking, validateQuery, validateReview, validateImage } = require('../../utils/validators')
const { Reviews } = require('@mui/icons-material')

const router = express.Router()

router.get('/', validateQuery, async (req, res) => {
    const { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query
    const where = {}
    const errorResult = { message: "Validation error", statusCode: 400, error: {} }

    if (minLat || maxLat) {
        if (minLat >= -90 && minLat <= 90 && maxLat >= -90 && maxLat <= 90) where.lat = {
            [Op.and]: {
                [Op.gte]: minLat,
                [Op.lte]: maxLat
            }
        }
        else if (maxLat >= -90 && maxLat <= 90) {
            where.lat = { [Op.lte]: maxLat }
            if (minLat) errorResult.error.minLat = "Minimum latitude is invalid"
        }
        else if (minLat >= -90 && minLat <= 90) {
            where.lat = { [Op.gte]: minLat }
            if (maxLat) errorResult.error.maxLat = "Maximum latitude is invalid."

        }
        else errorResult.error.lat = "Lat queries must be a decimal between -90 and 90."
    }

    if (minLng || maxLng) {
        if (minLng >= -180 && minLng <= 180 && maxLng >= -180 && maxLng <= 180) where.lng = {
            [Op.and]: {
                [Op.gte]: minLng,
                [Op.lte]: maxLng
            }
        }
        else if (maxLng >= -180 && maxLng <= 180) {
            where.lng = { [Op.lte]: maxLng }
            if (minLng) errorResult.error.minLng = "Minimum longitude is invalid"
        }
        else if (minLng >= -180 && minLng <= 180) {
            where.lng = { [Op.gte]: minLng }
            if (maxLng) errorResult.error.maxLng = "Maximum longitude is invalid"
        }
        else errorResult.error.lng = "Lng queries must be a decimal between -180 and 180."
    }

    if (minPrice || maxPrice) {
        if (minPrice > 0 && maxPrice > 0) where.price = {
            [Op.and]: {
                [Op.gte]: minPrice,
                [Op.lte]: maxPrice
            }
        }
        else if (minPrice > 0) {
            where.price = { [Op.gte]: minPrice }
            if (maxPrice) errorResult.error.maxPrice = "Maximum price must be greater than 0"
        }
        else if (maxPrice > 0) {
            where.price = { [Op.lte]: maxPrice }
            if (minPrice) errorResult.error.minPrice = "Minimum price must be greater than 0"
        }
        else errorResult.error.price = "Price queries must be greater than 0"
    }

    const result = {}
    result.spots = await Spot.findAll({
        include: ['Owner',
            { model: Review, include: { model: User } },
            { model: Booking, include: { model: User } }],
        where,
        limit: size,
        offset: (page - 1) * size
    })

    if (Object.keys(errorResult.error).length === 0) {
        result.page = page
        result.size = size
        return res.json(result)
    }
    else return res.json(errorResult)

})

// add image to spot
router.post('/:spotId/images', [validateImage, requireAuth], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) return res.json({ message: "Spot couldn't be found", statusCode: 404 })

    if (spot.ownerId !== req.user.id) return res.json({ message: "You must own this spot to add an image", statusCode: 401 })

    const images = await spot.getPics()
    // console.log(images)
    if (images.length >= 10) return res.json({ message: "Max 10 images allowed per spot" })

    const newImage = await Image.create({ type: 'spot', spotId: req.params.spotId, imageUrl: req.body.imageUrl, userId: req.user.id })
    return res.json(newImage)
})

// create new booking
router.post('/:spotId/bookings', [requireAuth, validateBooking], async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        const err = new Error('Spot does not exist.')
        err.status = 404
        err.errors = [err.message]
        return next(err)
    }

    // grab the startDate and endDate from the body and alias them
    const { startDate: start, endDate: end } = req.body

    // if the current user does not own the spot
    if (spot.ownerId === req.user.id) {
        const err = new Error("Can't make booking on your own property")
        err.status = 401
        err.errors = [err.message]
        return next(err)
    }

    // find all bookings that have dates between the requested start and end
    const conflictCheck = await Booking.findOne({
        where: {
            [Op.and]: {
                spotId: req.params.spotId,

                // if any of the following are true
                [Op.or]: [

                    // start and end dates are equal to existing booking
                    { [Op.and]: { startDate: start, endDate: end } },

                    // new booking's start date is in between existing booking's start and end date
                    {
                        [Op.and]: [
                            {
                                startDate: {
                                    [Op.lte]: start
                                }
                            },
                            {
                                endDate: {
                                    [Op.gte]: start
                                }
                            }]
                    },

                    // new booking's end date is in between existing booking's start or end date
                    {
                        [Op.and]: {
                            startDate: {
                                [Op.lte]: end
                            },
                            endDate: {
                                [Op.gte]: end
                            }
                        }
                    },

                    // new booking is in the middle of existing booking
                    {
                        [Op.and]: [
                            {
                                startDate: {
                                    [Op.lte]: start
                                }
                            },
                            {
                                endDate: {
                                    [Op.gte]: end
                                }
                            }
                        ]
                    },

                    // new booking completely overlaps existing booking
                    {
                        [Op.and]: {
                            startDate: {
                                [Op.gte]: start
                            },
                            endDate: {
                                [Op.lte]: end
                            }
                        }
                    }
                ]
            }
        }
    })

    if (conflictCheck) {
        return res.status(400).json({
            error: 'Conflicting booking:',
            conflictCheck
        })
    }

    const booking = await Booking.create({
        startDate: start,
        endDate: end,
        userId: req.user.id,
        spotId: req.params.spotId
    })

    const newBooking = await Booking.findByPk(booking.id, {
        include: [
            { model: User },
            { model: Spot }
        ]
    })
    return res.status(200).json(newBooking)
})

// get all bookings for spot based on spot id
router.get('/:spotId/bookings', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        const err = new Error('Spot does not exist.')
        err.status = 404
        err.errors = [err.message]
        return next(err)
    }

    const bookings = await spot.getBookings({
        include: {
            model: User
        }
    })
    return res.status(200).json(bookings)

})

// post a new review to a spot
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res, next) => {
    const userId = req.user.id
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const { content, stars } = req.body

    // if spot doesn't exist, break and pass error to error handler
    if (!spot) {
        const err = new Error('Spot does not exist.')
        err.status = 404
        err.errors = [err.message]
        return next(err)
    }

    // check if user already has a review for this spot
    const reviewCheck = await Review.findOne({
        where: {
            userId,
            spotId
        }
    })

    // if the review already exists, return and pass to error handler
    if (reviewCheck !== null) {
        const err = new Error('You have already reviewed this spot.')
        err.status = 403
        err.errors = [err.message]
        return next(err)
    }

    // otherwise, create a new review
    const newReview = await Review.create({
        userId,
        spotId,
        content,
        stars
    })

    // find the review with the included data I need
    const returnReview = await Review.findByPk(newReview.id, {
        include: {
            model: User
        }
    })
    return res.status(200).json(returnReview)
})
// reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (spot) {
        const reviews = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [
                { model: Image },
                { model: User, attributes: ['id', 'firstName', 'lastName'] }

            ],
            attributes: {
                include: ['createdAt', 'updatedAt']
            }
        })

        return res.json(reviews)
    } else return res.json({ message: "Spot doesn't exist." })
})

// searching for specific spot
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id, {
        include: [
            {
                model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review
            },
            'Pics',
        ],
    })

    // find all reviews related to the spot
    const result = {}
    const reviews = await spot.getReviews()
    if (!spot) {
        const err = new Error('Spot does not exist')
        err.status = 404
        err.errors = [err.message]
        return next(err)
    } else {

    }
    // add up all the stars from reviews of this spot
    let total = 0
    reviews.forEach(el => {
        total += el.stars
    })
    // add the data to the query's response
    result.spot = spot
    result.numReviews = reviews.length || 0
    result.avgStarRating = total / reviews.length || 0

    return res.json(result)

})
module.exports = router
