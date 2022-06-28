const router = require('express').Router()


// send back the request body when interacting with the '/api/test' endpoint
router.post('/test', (req, res) => {
    res.json({requestBody: req.body})
})
module.exports = router
