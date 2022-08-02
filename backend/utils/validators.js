const {check, query } = require('express-validator')
const { handleValidationErrors} = require('../utils/validation')

exports.validateSpot = [
    check('address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price')
      .exists({checkFalsy: true})
      .withMessage('Missing a value.'),
    check('address')
      .isAlphanumeric()
      .withMessage('Address must be letters or numbers')
      .isLength({min: 3, max: 15})
      .withMessage('Address must be between 3 and 15 characters'),
    check('city')
      .isAlpha()
      .withMessage('City must only contain letters')
      .isLength({ min: 3, max: 15})
      .withMessage('City must be between 3 and 15 characters'),
    //   .exists({checkFalsy:true})
    //   .withMessage('City is required'),
    // check('state')
    //   .exists({checkFalsy: true})
    //   .withMessage('State is required'),
    // check('country')
    // //   .exists({checkFalsy: true})
    //   .withMessage('State is required'),
    check('lat')
    //   .exists({checkFalsy: true})
      .isFloat()
      .withMessage('Latitude is not valid'),
    check('lng')
    //   .exists({checkFalsy: true})
      .isFloat()
      .withMessage('Longitude is not valid'),
    check('name')
    //   .exists({checkFalsy: true})
      .isLength({ max: 20})
      .withMessage('Name must be less than 20 characters'),
    // check('description')
    //   .exists({checkFalsy:true})
    //   .withMessage('Description is required'),
    check('price')
      // .exists({checkFalsy:true})
      .isFloat({ min: 1 })
      .withMessage('Price must be a number greater than 0.'),
    handleValidationErrors
  ];

  exports.validateBooking = [
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

exports.validateQuery = [
    query('page')
    .customSanitizer(page => parseInt(page) || 1)
    .isInt({min: 1, max: 10})
    .withMessage("Page must be between 1 and 10."),
    query('size')
    .customSanitizer(size => parseInt(size) || 20)
    .isInt({min: 1, max: 20})
    .withMessage("Size must be between 1 and 20."),
    query(['minLat', 'maxLat', 'minLng', 'maxLng', 'minPrice', 'maxPrice'])
    .customSanitizer(val => parseFloat(val)),
    handleValidationErrors
  ]

  exports.validateReview = [
    check('content')
      .exists({checkFalsy: true})
      .withMessage('Review field is required.')
      .isLength({ min: 10 })
      .withMessage('Review text must be at least 10 characters.'),
    check('stars')
      .isInt({min: 1, max: 5})
      .withMessage('Stars must be a number between 1-5'),
    handleValidationErrors
  ];

  exports.validateImage = [
    check('imageUrl')
    .exists({checkFalsy:true})
    .withMessage("Must provide image URL."),
    handleValidationErrors
  ]
