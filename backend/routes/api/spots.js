const express = require('express')
const { Spot, User, Image } = require('../../db/models')


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
    })

    if (spot) return res.json(spot)
    else {
        res.status(404).json({ Error: "Spot does not exist."})
    }
})
module.exports = router
