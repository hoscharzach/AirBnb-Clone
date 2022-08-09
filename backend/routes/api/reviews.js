const express = require('express')
const {Review, Image, User, Spot} = require('../../db/models')

const router = express.Router()

router.get('/', async (req, res) => {
    const reviews = await Review.findAll({
        include: [
            {model: User},
            {model: Image}
        ]
    })
    return res.json(reviews)
})

router.get('/test', async (req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: Review
        }
    })
    // const reviews = await spots.getReviews()

    res.json(spots)
})

module.exports = router
