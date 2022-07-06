const express = require('express')
const { Spot, User, Image, Review } = require('../../db/models')
const sequelize = require('sequelize')
const {check} = require('express-validator')
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')


const router = express.Router()

const validateReview = [
    check('review')
      .exists({checkFalsy: true})
      .isLength({ min: 10 })
      .withMessage('Review text must be at least 10 characters'),
    check('stars')
      .exists({checkFalsy:true})
      .isFloat({min: 1, max: 5})
      .withMessage('Stars must be a number between 1-5'),
    handleValidationErrors
  ];
// router.use(requireAuth)
router.get('/', async (req,res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

// post a new review to a spot
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res, next) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body

    if (spot) {
        const newReview = await Review.create({
            userId: userId,
            spotId: req.params.spotId,
            content: review,
            stars})

       return res.json(newReview)
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

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
