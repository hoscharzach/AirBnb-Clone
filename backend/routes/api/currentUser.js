const express = require('express')
const { User, Spot, Review, Image, Booking } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors} = require('../../utils/validation')
const {Op} = require('sequelize')
const { response } = require('express')
const router = express.Router()

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

const validateSpot = [
    check('address')
      .exists({checkFalsy: true})
      .withMessage('Street address is required'),
    check('city')
      .exists({checkFalsy:true})
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy: true})
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy: true})
      .withMessage('State is required'),
    check('lat')
      .exists({checkFalsy: true})
      .isFloat()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({checkFalsy: true})
      .isFloat()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({checkFalsy: true})
      .isLength({ max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({checkFalsy:true})
      .withMessage('Description is required'),
    check('price')
      .exists({checkFalsy:true})
      .isFloat()
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

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

  const validateImage = [
    check('imageUrl')
    .exists({checkFalsy:true})
    .withMessage("Must provide image URL."),
    handleValidationErrors
  ]

router.delete('/images/:imageId', requireAuth, async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId)
  if (!image) return res.json({message: "Image couldn't be found", statusCode: 404})

  if (image.userId !== req.user.id)
  return res.json({message: "You are not authorized to delete this image", statusCode: 401})

  await image.destroy()
  return res.json({message: "Successfully deleted", statusCode: 200})
})
// delete a review
router.delete('/reviews/:reviewId', [requireAuth], async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review && req.user.id === review.userId) {
    await review.destroy()
    return res.json({message: "Review successfully deleted."})
  } else if (review && req.user.id !== review.userId) {
    return res.json({message: "You are not authorized to delete this review", statusCode: 401})
  } else {
    return res.json({message: "Review could not be found", statusCode: 404})
  }


})

router.post('/reviews/:reviewId/images', [requireAuth, validateImage], async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (!review) return res.json({message: "Review could not be found", statusCode: 404})

  if(review.userId !== req.user.id)
  return res.json({message: "Only the owner of this review may add images", statusCode: 401})

  const images = await review.getImages()
  if (images.length >= 10) return res.json({message: "No more than 10 images allowed per review", statusCode: 400})

  const newImage = await Image.create({
    type: 'review',
    imageUrl: req.body.imageUrl,
    reviewId: req.params.reviewId,
    userId: req.user.id})

    return res.json(newImage)
})
// edit a review
router.put('/reviews/:reviewId', [requireAuth, validateReview], async (req, res, next) => {
    // grab the info from body of request
    const { review, stars } = req.body
    // find the review
    const editReview = await Review.findByPk(req.params.reviewId)

    if (editReview) {

      if (editReview.userId === req.user.id) {
        editReview.content = review
        editReview.stars = stars
        await editReview.save()
        return res.json(editReview)
      } else return res.json({
        message: "You are not authorized to edit this review",
        statusCode: 401
      })
    } else return res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
})
// get all review for current user with associated images
router.get('/reviews', requireAuth, async (req, res, next) => {

    const id = req.user.id
    // console.log(req.user)
    const reviews = await Review.findAll({
      include: [
        {model: Image},
        {model: Spot},
        {model: User, attributes: ['id', 'firstName', 'lastName']}
      ],
      where: {
        userId: id
      }
    })
    return res.json(reviews)

})

// find all spots belonging to current user
router.get('/spots', [requireAuth], async (req, res, next) => {
    if (req.user) {
        id = req.user.id
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
        })

        if (spots.length === 0) return res.json({message: "You have no spots."})
        if (spots) return res.json(spots)
        else return res.json({ message: "You have no spots."})
    }
})

router.delete('/bookings/:bookingId', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking)
  return res.json({message: "Booking not found", statusCode: 404})

  const spot = await Spot.findByPk(booking.spotId)

  if ((req.user.id !== booking.userId) && (spot.ownerId !== req.user.id))
  return res.json({message: "You are not authorized to delete this"})

  const today = new Date().toISOString().slice(0, 10)

  if (booking.startDate < today)
  return res.json({message: "Cannot delete bookings that are in progress or completed", statusCode: 400})

  await booking.destroy()
  return res.json({message: "Successfully deleted", statusCode: 200})

})
// edit booking
router.put('/bookings/:bookingId', [validateBooking, requireAuth], async (req, res, next) => {
  const { startDate:start, endDate:end } = req.body
  const userId = req.user.id
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking)
  return res.json({message: "Booking couldn't be found", statusCode:404})

  if(userId !== booking.userId)
  return res.json({message: "You are not authorized to edit this booking"})

  if(booking.endDate < new Date().toISOString().slice(0, 10))
  return res.json({message: "Past bookings can't be modified", statusCode: 400})

    const spotId = booking.spotId
    const spot = await Spot.findByPk(spotId)

    const conflictCheck = await spot.getBookings({
      where: {
        id: {
          [Op.notIn]: [req.params.bookingId]
        }
      }
    })

    const response = {message: "Sorry, this spot is already booked for the specified dates.", errors: {}}
    for (reservation of conflictCheck) {

      if (reservation.startDate === start && reservation.endDate === end)
      return res.json({message: "Booking already exists for the specified dates."})

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
        booking.startDate = start
        booking.endDate = end
        await booking.save()
        return res.json(booking)
      }
})

router.get('/bookings', requireAuth, async (req, res, next) => {
  if (req.user) {
    const currUser = req.user.id
    const bookings = await Booking.findAll({
      where: {
        userId: currUser
      },
      include: [
        {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}},
      ],

    })
    res.json({Bookings: bookings})
  }


})

router.post('/spots', [requireAuth, validateSpot], async (req, res, next) => {
  const { address, city ,state, country, lat, lng, name, description, price } = req.body
  const id = req.user.id
  const newSpot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId: id
  })

  return res.json(newSpot)

})

router.delete('/spots/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (spot) {
    if (req.user.id === spot.ownerId) {
      await spot.destroy()
      return res.json({ message:"Spot successfully deleted."})
    } else return res.json( {statusCode: 401, message: "You are not authorized to delete this spot."} )
  } else return res.status(404).json({message: "This spot could not be found."})
})

router.put('/spots/:spotId', [requireAuth, validateSpot], async (req, res, next) => {
  const currUserId = req.user.id
  const editSpot = await Spot.findByPk(req.params.spotId)
  if (!editSpot) return res.json({ message: "Spot couldn't be found", statusCode: 404})

  const { address, city ,state, country, lat, lng, name, description, price } = req.body

  if (currUserId === editSpot.ownerId) {
    editSpot.address = address
    editSpot.city = city
    editSpot.state = state
    editSpot.country = country
    editSpot.lat = lat
    editSpot.lng = lng
    editSpot.name = name
    editSpot.description = description
    editSpot.price = price

    await editSpot.save()
    return res.json(editSpot)

  } else {
    return res.status(401).json({ stausCode: 401, message: "You cannot edit other user's spots."})
  }

})


module.exports = router
