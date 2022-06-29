const router = require('express').Router()
const { setTokenCookie } = require('../../utils/auth.js')
const { User } = require('../../db/models')
const { restoreUser } = require('../../utils/auth.js')
const { requireAuth } = require('../../utils/auth.js')


router.use(restoreUser)

router.get('/restore-user', async (req, res) => {
    return res.json(req.user)
})

router.get('/require-auth', requireAuth, async (req, res) => {
    return res.json(req.user)
})

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    })
    setTokenCookie(res, user)
    return res.json({ user })
})
// send back the request body when interacting with the '/api/test' endpoint
router.post('/test', (req, res) => {
    res.json({requestBody: req.body})
})
module.exports = router
