const express = require('express')
const { User, Spot, Review, Image, Booking } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Op } = require('sequelize')
const { response } = require('express')
const router = express.Router()
const { validateSpot, validateQuery, validateBooking, validateReview, validateImage } = require('../../utils/validators')
const { multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3')

router.delete('/images/:imageId', requireAuth, async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId)
  if (!image) return res.json({ message: "Image couldn't be found", statusCode: 404 })

  if (image.userId !== req.user.id)
    return res.json({ message: "You are not authorized to delete this image", statusCode: 401 })

  await image.destroy()
  return res.json({ message: "Successfully deleted", statusCode: 200 })
})

router.delete('/reviews/:reviewId', [requireAuth], async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)

  if (review === null) {
    const err = new Error("Review doesn't exist.")
    err.status = 404
    err.errors = [err.message]
    return next(err)
  }

  if (review && req.user.id !== review.userId) {
    const err = newError("You are not authorized to delete this review")
    err.status = 401
    err.errors = [err.message]
    return next(err)
  }

  await review.destroy()
  return res.status(200).json({ Message: "Review successfully deleted" })
})

router.post('/reviews/:reviewId/images', [requireAuth, validateImage], async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (!review) return res.json({ message: "Review could not be found", statusCode: 404 })

  if (review.userId !== req.user.id)
    return res.json({ message: "Only the owner of this review may add images", statusCode: 401 })

  const images = await review.getImages()
  if (images.length >= 10) return res.json({ message: "No more than 10 images allowed per review", statusCode: 400 })

  const newImage = await Image.create({
    type: 'review',
    imageUrl: req.body.imageUrl,
    reviewId: req.params.reviewId,
    userId: req.user.id
  })

  return res.json(newImage)
})
// edit a review
router.put('/reviews/:reviewId', [requireAuth, validateReview], async (req, res, next) => {
  const { content, stars } = req.body
  const editReview = await Review.findByPk(req.params.reviewId)

  if (editReview === null) {
    const err = new Error("Review doesn't exist")
    err.status = 404
    err.errors = [err.message]
    next(err)
  }

  if (editReview && editReview.userId !== req.user.id) {
    const err = newError("You are not authorized to edit this review.")
    err.status = 401
    err.errors = [err.message]
    next(err)
  }

  editReview.content = content
  editReview.stars = stars
  await editReview.save()

  const returnReview = await Review.findOne({
    where: {
      id: editReview.id
    },
    include: {
      model: User
    },
  })

  return res.json(returnReview)
})
// get all review for current user with associated images
router.get('/reviews', requireAuth, async (req, res, next) => {

  const id = req.user.id
  const reviews = await Review.findAll({
    include: [
      { model: Image },
      { model: Spot },
      { model: User, attributes: ['id', 'firstName', 'lastName'] }
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

    if (spots.length === 0) return res.json({ message: "You have no spots." })
    if (spots) return res.json(spots)
    else return res.json({ message: "You have no spots." })
  }
})

router.delete('/bookings/:bookingId', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking)
    return res.json({ message: "Booking not found", statusCode: 404 })

  const spot = await Spot.findByPk(booking.spotId)

  if ((req.user.id !== booking.userId) && (spot.ownerId !== req.user.id))
    return res.json({ message: "You are not authorized to delete this" })

  const today = new Date().toISOString().slice(0, 10)

  if (booking.startDate < today)
    return res.json({ message: "Cannot delete bookings that are in progress or completed", statusCode: 400 })

  await booking.destroy()
  return res.json({ message: "Successfully deleted", statusCode: 200 })

})
// edit booking
router.put('/bookings/:bookingId', [validateBooking, requireAuth], async (req, res, next) => {
  const { startDate: start, endDate: end } = req.body
  const userId = req.user.id
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking)
    return res.json({ message: "Booking couldn't be found", statusCode: 404 })

  if (userId !== booking.userId)
    return res.json({ message: "You are not authorized to edit this booking" })

  if (booking.endDate < new Date().toISOString().slice(0, 10))
    return res.json({ message: "Past bookings can't be modified", statusCode: 400 })

  const spotId = booking.spotId
  const spot = await Spot.findByPk(spotId)

  const conflictCheck = await spot.getBookings({
    where: {
      id: {
        [Op.notIn]: [req.params.bookingId]
      }
    }
  })

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
        { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      ],

    })
    res.json({ Bookings: bookings })
  }


})

router.post('/spots', [multipleMulterUpload("images"), requireAuth, validateSpot], async (req, res, next) => {

  const { bonfires, bosses, directions, country, realm, name, shortDescription, longDescription, price } = req.body
  const imageLinks = await multiplePublicFileUpload(req.files)


  const id = req.user.id
  const newSpot = await Spot.create({
    directions,
    country,
    realm,
    name,
    shortDescription,
    longDescription,
    price,
    bonfires,
    bosses,
    ownerId: id
  })

  imageLinks.forEach(async img => {
    const newImg = await Image.create({
      spotId: newSpot.id,
      imageUrl: img
    })
    await newSpot.addImage(newImg)
  })

  const spot = await Spot.findByPk(newSpot.id, {
    include: [
      { model: Image },
      { model: Review },
      { model: Booking },
      'Owner'
    ]
  })

  return res.json(spot)

})

router.delete('/spots/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const err = new Error("The spot doesn't exist")
    err.errors = [err.message]
    err.status = 404
    return next(err)
  }

  if (req.user.id !== spot?.ownerId) {
    const err = new Error("You are not authorized to delete this spot.")
    err.errors = [err.message]
    err.status = 401
    return next(err)
  }

  await spot.destroy()
  return res.json({ message: "Spot successfully deleted." })
})

router.put('/spots/:spotId', [multipleMulterUpload("images"), requireAuth, validateSpot], async (req, res, next) => {
  const currUserId = req.user.id
  const editSpot = await Spot.findByPk(req.params.spotId)
  const imageLinks = await multiplePublicFileUpload(req.files)

  if (!editSpot) {
    const err = new Error('Spot does not exist')
    err.errors = [err.message]
    err.status = 404
    return next(err)
  }

  if (currUserId !== editSpot.ownerId) {
    const err = new Error('You are not authorized to edit this spot.')
    err.status = 401
    err.errors = [err.message]
    return next(err)
  }

  await editSpot.setImages([])

  const { imageUrls } = req.body
  imageUrls.split(',').forEach(async img => {
    const existingImg = await Image.findOne({
      where: {
        imageUrl: img
      }
    })
    await editSpot.addImage(existingImg)
  })
  imageLinks.forEach(async img => {
    const newImg = await Image.create({
      spotId: editSpot.id,
      imageUrl: img
    })
    await editSpot.addImage(newImg)
  })

  const {
    directions,
    country,
    realm,
    name,
    shortDescription,
    longDescription,
    price,
    bonfires,
    bosses,
  } = req.body



  editSpot.directions = directions
  editSpot.country = country
  editSpot.shortDescription = shortDescription
  editSpot.longDescription = longDescription
  editSpot.realm = realm
  editSpot.bonfires = bonfires
  editSpot.bosses = bosses
  editSpot.name = name
  editSpot.price = price

  await editSpot.save()
  const returnSpot = await Spot.findByPk(editSpot.id, {
    include: [
      'Owner',
      { model: Image },
      { model: Review },
      { model: Booking }
    ]
  })
  return res.json(returnSpot)

})


module.exports = router
