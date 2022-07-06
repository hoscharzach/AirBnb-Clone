const express = require('express')
const { Spot, User, Image, Review } = require('../../db/models')
const sequelize = require('sequelize')
const review = require('../../db/models/review')
const { requireAuth } = require('../../utils/auth')


const router = express.Router()
// router.use(requireAuth)
router.get('/', async (req,res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})



// reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (spot) {
        const reviews = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [
                { model: Image },
                { model: User, attributes: [ 'id', 'firstName', 'lastName' ] }

            ],
            attributes: {
                include: ['createdAt', 'updatedAt']
            }
        })

        return res.json(reviews)
    } else return res.json({ message: "Spot doesn't exist." })
})

// searching for specific spot
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id, {
        include: [
            {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
            'Pics',
        ],
    })

    // find all reviews related to the spot
    const reviews = await Review.findAll( {
        where: {
            spotId: id
        }
    })

    // add up all the stars from reviews of this spot
    let total = 0
    reviews.forEach(el => {
        total += el.stars
    })
    // add the data to the query's response
    spot.numReviews = reviews.length || 0
    spot.avgStarRating = total / reviews.length || 0

    if (spot) return res.json(spot)
    else {
        res.status(404).json({ Error: "Spot does not exist."})
    }
})
module.exports = router







// router.get('/:spotId', async (req, res, next) => {
//     const result = await Spot.findByPk(req.params.spotId,
//         {
//             include: [
//                 { model: Review, attributes: [] },
//                 { model: Image, as: 'Pics', attributes: ['imageUrl'] },
//                 { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
//             ],
//             attributes: {
//                 include: [
//                     //if you comment out images this will return the corrected count
//                     // [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'countReviews'],
//                     //there are duplicated being return by adding images, using
//                     //DISTINCT will also return the corrected count of 2
//                     [sequelize.literal('COUNT(DISTINCT(reviews.id))'), 'numReviews'],
//                     // [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
//                 ],
//             },
//         })
//     res.json(result)

//     if (!result) {
//         res.status(404).json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//           })
//     }
// })
