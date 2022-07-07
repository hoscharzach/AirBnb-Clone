const express = require('express')
const { Spot, User, Image, Review, Booking } = require('../../db/models')
const sequelize = require('sequelize')
const {check} = require('express-validator')
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors} = require('../../utils/validation')
const {Op} = require('sequelize')

const router = express.Router()
const validateReview = [
    check('review')
      .exists({checkFalsy: true})
      .isLength({ min: 10 })
      .withMessage('Review text must be at least 10 characters'),
    check('stars')
      .exists({checkFalsy:true})
      .isFloat({min: 1, max: 5})
      .withMessage('Stars must be a number between 1-5'),
    handleValidationErrors
  ];
const validateBooking = [
    check('startDate')
    .exists({checkFalsy: true})
    .withMessage("Must provide a start date.")
    .isDate()
    .withMessage("Date must be in format YYYY-MM-DD")
    .isAfter()
    .withMessage("Date must be in the future."),
  check('endDate')
    .exists({checkFalsy:true})
    .withMessage("Must provide an end date.")
    .isDate()
    .withMessage("Date must be in format YYYY-MM-DD")
    .isAfter()
    .withMessage('Past bookings cannot be created or modified')
    .custom(async function(endDate, { req }) {
      if (endDate < req.body.startDate) throw new Error
    })
    .withMessage("End date must be after start date"),
  handleValidationErrors
  ];



router.get('/', async (req,res) => {
    const spots = await Spot.findAll()
    return res.json(spots)
})
// create new booking
router.post('/:spotId/bookings', [requireAuth, validateBooking], async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) return res.json({message: "Spot couldn't be found", statusCode: 404})

    // grab the startDate and endDate from the body and alias them
    const { startDate:start, endDate:end } = req.body

    // if the current user does not own the spot
    if (spot.ownerId === req.user.id)
    return res.json({message: "Can't make booking on your own property.", statusCode: 401})
        // and the start date is before the end date
            // find all bookings that have dates between the requested start and end
    const conflictCheck = await spot.getBookings()
    const response = {message: "Sorry, this spot is already booked for the specified dates.", errors: {}}
        for (reservation of conflictCheck) {
            if (reservation.startDate <= start && reservation.endDate >= start) {
                response.errors.startDate = "Start date conflicts with an existing booking."
            }
            if (reservation.startDate <= end && reservation.endDate >= end) {
                  response.errors.endDate = "End date conflicts with an existing booking."
            }
        }
            if (response.errors.startDate || response.errors.endDate) {
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
            }})
            return res.json(bookings)

        } else {
            const bookings = await spot.getBookings({
                attributes: {
                    exclude: ['userId', 'createdAt', 'updatedAt']
                }
            })
            return res.json(bookings)
        }
    } else return res.json({message: "Spot not found.", statusCode: 404})
})

// post a new review to a spot
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res, next) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body

    if (spot) {
        // check if review already exists
        const reviewCheck = await Review.findOne({
            where: {
                userId: userId,
                spotId: req.params.spotId
            }
        })
        // if there is no review, create the review
        if (!reviewCheck) {
            const newReview = await Review.create({
                userId: userId,
                spotId: req.params.spotId,
                content: review,
                stars})

           return res.json(newReview)
        // if there is a review, return an error
        } else return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

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
                { model: User, attributes: [ 'id', 'firstName', 'lastName' ] }

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
    const reviews = await Review.findAll( {
        where: {
            spotId: id
        }
    })
    if (spot) {
        const jsonSpot = spot.toJSON()
        // add up all the stars from reviews of this spot
        let total = 0
        reviews.forEach(el => {
            total += el.stars
        })
        // add the data to the query's response
        jsonSpot.numReviews = reviews.length || 0
        jsonSpot.avgStarRating = total / reviews.length || 0

        return res.json(jsonSpot)
    }
    else {
        res.status(404).json({ Message: "Spot does not exist.", statusCode: 404})
    }
})
module.exports = router
