const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

// VALIDATE SIGN UP MIDDLEWARE
const validateSignup = [
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
    .exists({checkFalsy:true})
    .withMessage('First name is required.'),
  check('lastName')
    .exists({checkFalsy:true})
    .withMessage('Last name is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// SIGN UP
router.post('/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      const user = await User.signup({ email, username, password, firstName, lastName });


      const token = await setTokenCookie(res, user);

      const returnUser = {
        id: user.id,
        username,
        firstName,
        lastName,
        email,
        token
      }

      return res.json({
        returnUser,
      });
    }
  );


module.exports = router
