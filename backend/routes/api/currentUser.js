const express = require('express')
const { User, Spot } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router()

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

router.get('/spots', [restoreUser, requireAuth], async (req, res, next) => {
    if (req.user) {
        id = req.user.id
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
        })
        return res.json(spots)

    } else {
        const err = new Error ("User not found")
        res.status = 404
        return res.json(err)
    }
})

router.post('/spots', [restoreUser, requireAuth, validateSpot], async (req, res, next) => {
  const { address, city ,state, country, lat, lng, name, description, price } = req.body

  // const newSpot = await Spot.create({
  //   address,
  //   city,
  //   state,
  //   country,
  //   lat,
  //   lng,
  //   name,
  //   description,
  //   price
  // })

  return res.json(req.body)

})


module.exports = router
