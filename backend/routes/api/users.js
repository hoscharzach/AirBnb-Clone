const express = require('express')

const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')
const { validateSignup } = require('../../utils/validators')

const router = express.Router()

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
