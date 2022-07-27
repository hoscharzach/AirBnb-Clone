const express = require('express')
const {Review, Image, User} = require('../../db/models')

const router = express.Router()

router.get('', async (req, res) => {
    const reviews = await Review.findAll({
        include: [
            {model: User},
            {model: Image}
        ]
    })
    return res.json(reviews)
})

module.exports = router
