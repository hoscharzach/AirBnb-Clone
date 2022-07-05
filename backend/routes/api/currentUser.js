const express = require('express')
const { User, Spot } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router()

// const validateSpot = [
//     check('ownerId')
//       .exists({ checkFalsy: true })
//       .withMessage('Please provide a valid email.'),
//     handleValidationErrors
//   ];

router.get('/spots', [restoreUser, requireAuth], async (req, res, next) => {
    if (req.user) {
        id = req.user.id
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
            attributes: {
                exclude: ['numReviews', 'avgStarRating']
            }

        })
        return res.json(spots)

    } else {
        const err = new Error ("User not found")
        res.status = 404
        return res.json(err)
    }
})

router.post('/spots', [restoreUser, requireAuth], async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    requiredFields.forEach(el => {

      if (req.body[el] === undefined) {
        return res.json({
          yo: req.body
        })
      }
    })

    if (req.user) {
      res.json({yo: "hello"})
    }
})


module.exports = router
