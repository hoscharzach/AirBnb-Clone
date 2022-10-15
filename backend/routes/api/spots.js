const express = require('express')
const { Spot, User, Image, Review, Booking } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { validateSpot, validateBooking, validateQuery, validateReview, validateImage } = require('../../utils/validators')

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
        where,
        limit: size,
        offset: (page - 1) * size,
        raw: true,
        include: 'Owner'
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
    if (!spot) return res.json({ message: "Spot couldn't be found", statusCode: 404 })

    // grab the startDate and endDate from the body and alias them
    const { startDate: start, endDate: end } = req.body

    // if the current user does not own the spot
    if (spot.ownerId === req.user.id)
        return res.json({ message: "Can't make booking on your own property.", statusCode: 401 })
    // and the start date is before the end date
    // find all bookings that have dates between the requested start and end
    const conflictCheck = await spot.getBookings()
    const response = { message: "Sorry, this spot is already booked for the specified dates.", errors: {} }
    for (reservation of conflictCheck) {

        if (reservation.startDate === start && reservation.endDate === end)
            return res.json({ message: "Booking already exists for the specified dates." })

        if (reservation.startDate <= start && reservation.endDate >= start) {
            response.errors.startDate = "Start date conflicts with an existing booking."
        }
        if (reservation.startDate <= end && reservation.endDate >= end) {
            response.errors.endDate = "End date conflicts with an existing booking."
        }
        if (start <= reservation.startDate && end >= reservation.endDate) {
            response.errors.partial = "Part of your booking overlaps another."
        }
    }
    if (response.errors.startDate || response.errors.endDate || response.errors.partial) {
        return res.json(response)
    } else {
        const newBooking = await Booking.create({
            startDate: start,
            endDate: end,
            userId: req.user.id,
            spotId: req.params.spotId
        })

        return res.json(newBooking)
    }
})

// get all bookings for spot based on spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const id = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (spot) {
        if (spot.ownerId === id) {
            const bookings = await spot.getBookings({
                include: {
                    model: User
                }
            })
            return res.json(bookings)

        } else {
            const bookings = await spot.getBookings({
                attributes: {
                    exclude: ['userId', 'createdAt', 'updatedAt']
                }
            })
            return res.json(bookings)
        }
    } else return res.json({ message: "Spot not found.", statusCode: 404 })
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
    const returnReview = await Review.findOne({
        where: {
            userId
        },
        include: {
            model: User
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
    return res.json(returnReview)
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
