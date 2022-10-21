const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User, Spot, Booking, Image } = require('../../db/models')
const { validateLogin } = require('../../utils/validators')

const router = express.Router()

router.get("/", restoreUser, async (req, res) => {
    const { user } = req;
    const token = req.cookies.token;

    if (user) {
        const userData = await User.findOne({
            where: {
                id: Number(user.id),

            },
            include: [
                { model: Booking, include: { model: Spot, include: { model: Image } } }
            ],
            exclude: [
                ['hashedPassword']
            ]
        })


        return res.json({
            user: userData,
            token,
        });

    }

    return res.json({});
});

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.login({ credential, password })

    if (!user) {
        const err = new Error('Login failed')
        err.status = 401
        err.title = 'Login failed'
        err.errors = ['The provided credentials were invalid']
        return next(err)
    }

    const token = await setTokenCookie(res, user)
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
        safeUser: userData,
        token
    })
})

router.delete('/', async (req, res) => {
    res.clearCookie('token')
    return res.json({ message: 'Successfully logged out' })
})

module.exports = router
