const { check, query } = require('express-validator')
const { handleValidationErrors } = require('../utils/validation')

exports.validateSpot = [
  check('directions', 'country', 'realm', 'name', 'shortDescription', 'longDescription', 'price')
    .exists({ checkFalsy: true })
    .withMessage('All values are required.'),
  check('directions')
    .isAlphanumeric('en-US', { ignore: ' -,' })
    .withMessage('Address must be letters or numbers')
    .isLength({ min: 3, max: 25 })
    .withMessage('Address must be between 3 and 25 characters'),
  check('country')
    .isLength({ min: 3, max: 25 })
    .withMessage('Country must be between 3 and 25 characters'),
  check('realm')
    .isLength({ min: 3, max: 25 })
    .withMessage('Country must be between 3 and 25 characters'),
  check('name')
    .isLength({ min: 5, max: 20 })
    .withMessage('Name must be between 5 and 20 characters.'),
  check('shortDescription')
    .isLength({ min: 5, max: 30 })
    .withMessage('Short description must be between 5 and 20 characters.'),
  check('longDescription')
    .isLength({ min: 10, max: 500 })
    .withMessage('Long description must be between 10 and 200 characters.'),
  check('price')
    .isFloat({ min: 1 })
    .withMessage('Price must be a number greater than 1.'),
  handleValidationErrors
];

exports.validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

exports.validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage("Must provide a start date.")
    .isDate()
    .withMessage("Date must be in format YYYY-MM-DD")
  // .custom(async function (startDate) {
  //   const today = new Date()
  //   const start = new Date(startDate)
  //   if (start < today) {
  //     throw new Error
  //   }
  // })
  // .withMessage("Date must be in the future.")
  ,
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage("Must provide an end date.")
    .isDate()
    .withMessage("Date must be in format YYYY-MM-DD")
    // .isAfter()
    // .withMessage('Past bookings cannot be created or modified')
    .custom(async function (endDate, { req }) {
      if (endDate < req.body.startDate) throw new Error
    })
    .withMessage("End date must be after start date"),
  handleValidationErrors
];

exports.validateQuery = [
  query('page')
    .customSanitizer(page => parseInt(page) || 1)
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be between 1 and 10."),
  query('size')
    .customSanitizer(size => parseInt(size) || 20)
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be between 1 and 20."),
  query(['minLat', 'maxLat', 'minLng', 'maxLng', 'minPrice', 'maxPrice'])
    .customSanitizer(val => parseFloat(val)),
  handleValidationErrors
]

exports.validateReview = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Review field is required.')
    .isLength({ min: 10 })
    .withMessage('Review text must be at least 10 characters.'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be a number between 1-5'),
  handleValidationErrors
];

exports.validateImage = [
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage("Must provide image URL."),
  handleValidationErrors
]

exports.validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 20 })
    .withMessage('Please provide a username between 4 and 20 characters.'),
  check('username')
    .isAlphanumeric()
    .withMessage("Username must consist of letters and numbers"),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
