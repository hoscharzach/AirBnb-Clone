import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import { useEffect, useState } from "react"


export default function SpotCard({ spot }) {

    const [avgStarRating, setAvgStarRating] = useState(null)

    useEffect(() => {
        if (spot.Reviews.length > 0) {
            let numReviews = spot.Reviews.length
            let sum = spot.Reviews.reduce((acc, review) => {
                return acc + review.stars
            }, 0)
            let rating = (sum / numReviews)
            if (rating - Math.floor(rating) === 0) {
                setAvgStarRating(rating.toFixed(1))
            } else {
                setAvgStarRating(rating.toFixed(2))
            }
        }
    }, [spot.Reviews])

    return (
        <Link to={`/spots/${spot.id}`} >
            {/* card container */}
            <div className="h-full w-full aspect-square">
                {/* card image */}
                <div className="rounded-xl h-[85%]">
                    <img className="object-cover w-full h-full rounded-xl flex flex-col shadow-lg " src={spot.Images[0]?.imageUrl} alt="" />
                </div>
                <div className="flex flex-col pt-2 grow">
                    <div className="flex items-center justify-between">

                        <div className="font-bold">{spot.country}, {spot.realm}</div>
                        {avgStarRating && <div className="flex items-center"><img className="h-[12px] w-[12px] mr-1" src={star} alt="" /> {avgStarRating} </div>}
                        {!avgStarRating && <span>New!</span>}
                    </div>
                    <div className="price-container">
                        <span className="font-bold">${spot.price}</span> night
                    </div>
                </div>
            </div>
        </Link>
    )
}
