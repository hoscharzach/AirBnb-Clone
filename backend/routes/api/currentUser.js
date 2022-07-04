const express = require('express')
const { User, Spot } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')
const router = express.Router()

router.get('/spots', [restoreUser, requireAuth], async (req, res, next) => {
    if (req.user) {
        id = req.user.id
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
            attributes: {
                exclude: ['numReviews', 'avgStarRating']
            }

        })
        return res.json(spots)

    } else {
        const err = new Error ("User not found")
        res.status = 404
        return res.json(err)
    }
})


module.exports = router
