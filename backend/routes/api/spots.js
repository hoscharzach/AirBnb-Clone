const express = require('express')
const { Spot, User, Image, Review } = require('../../db/models')
const sequelize = require('sequelize')
const review = require('../../db/models/review')


const router = express.Router()

router.get('/', async (req,res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})


router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findOne({
        where:{
            id:id
        },
        include: [
            'Owner',
            'Pics',
        ],
        attributes: {
            exclude: ['ownerId']
        }

        // POTENTIALLY INCLUDE AGGREGATES IN THE SAME QUERY

        // attributes: {
        //     include: [
        //         // [sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        //         // "avgStarRating"],
        //         // [sequelize.fn("COUNT", sequelize.col("Reviews")),
        //         // "numReviews"]
        //     ]
        // }

    })
    const spotReviews = await Spot.findByPk(id, {
        include: 'Reviews'
    })
    const reviews = spotReviews.Reviews
    let total = 0
    reviews.forEach(el => {
        total += el.stars
    })
    spot.numReviews = reviews.length
    spot.avgStarRating = total/reviews.length

    if (spot) return res.json(spot)
    else {
        res.status(404).json({ Error: "Spot does not exist."})
    }
})
module.exports = router
