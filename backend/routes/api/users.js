const express = require('express')

const { setTokenCookie } = require('../../utils/auth')
const { User, Booking, Spot } = require('../../db/models')
const { validateSignup } = require('../../utils/validators')

const router = express.Router()

router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  const user = await User.signup({ email, username, password, firstName, lastName });


  const token = await setTokenCookie(res, user);

  const userData = await User.findOne({
    where: {
      id: Number(user.id),

    },
    include: [
      { model: Booking, include: { model: Spot } }
    ],
    exclude: [
      ['hashedPassword']
    ]
  })


  return res.json({
    userData,
    token
  });
}
);


module.exports = router
