const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const spotsRouter = require('./spots.js')
const { restoreUser } = require('../../utils/auth.js')

// IMPORTS FOR TESTING

// const { setTokenCookie } = require('../../utils/auth.js')
// const { User } = require('../../db/models')
// const { requireAuth } = require('../../utils/auth.js')


// if current user session is valid, req.user is the user in the database
// if the current sessions is not valid, set req.user to null
router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/spots', spotsRouter)
router.use('/users', usersRouter)

router.post('/test', (req, res) => {
    res.json({requestBody: req.body})
})


module.exports = router






// TESTING PURPOSES

// router.get('/restore-user', async (req, res) => {
//     return res.json(req.user)
// })

// router.get('/require-auth', requireAuth, async (req, res) => {
//     return res.json(req.user)
// })

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user)
//     return res.json({ user })
// })
// // send back the request body when interacting with the '/api/test' endpoint
// router.post('/test', (req, res) => {
//     res.json({requestBody: req.body})
// })
