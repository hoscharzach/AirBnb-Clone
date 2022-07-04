const jwt = require('jsonwebtoken')
const { jwtConfig} = require('../config')
const { User } = require('../db/models')

const { secret, expiresIn } = jwtConfig

const setTokenCookie = (res, user) => {
    // create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    )
    // evaluates to true if in production
    const isProduction = process.env.NODE_ENV === 'production'

    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // turns it into milliseconds
        httpOnly: true,
        secure: isProduction, // enables secure if we're in production
        sameSite: isProduction && "Lax"
    })

    return token
}

const restoreUser = (req, res, next) => {
    const { token } = req.cookies
    req.user = null

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next()
        }

        try {
            const { id } = jwtPayload.data
            req.user = await User.scope('currentUser').findByPk(id)
        } catch (e) {
            res.clearCookie('token')
            return next()
        }

        if (!req.user) res.clearCookie('token')

        return next()
    })

}

const requireAuth = function (req, res, next) {
    if (req.user) return next()

    const err = new Error('Unauthorized')
    err.title = 'Unauthorized'
    err.errors = ['Unauthorized']
    err.status = 401
    return next(err)
}

module.exports = { setTokenCookie, restoreUser, requireAuth }
