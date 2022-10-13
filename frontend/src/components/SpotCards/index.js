import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import EditListingModal from "../EditSpotModal"
import DeleteListingModal from "../DeleteListingModal"
import { useEffect, useState } from "react"


export default function SpotCard({ spot, type }) {

    const allReviews = useSelector(state => state.reviews.normalizedReviews)
    const reviews = Object.values(allReviews).filter(review => spot.id === review.spotId)
    const [avgStarRating, setAvgStarRating] = useState(null)

    useEffect(() => {
        if (reviews.length > 0) {
            let numReviews = reviews.length
            let sum = reviews.reduce((acc, review) => {
                return acc + review.stars
            }, 0)
            let rating = (sum / numReviews)
            if (rating - Math.floor(rating) === 0) {
                setAvgStarRating(rating.toFixed(1))
            } else {
                setAvgStarRating(rating.toFixed(2))
            }
        }
    }, [reviews])

    //  <EditListingModal spot={spot} />
    // <DeleteListingModal spot={spot} />


    return (
        <Link to={`/spots/${spot.id}`} >
            {/* card container */}
            <div className="h-full w-full before:content-[''] before:h-0 before:w-0 before:pb-[75%] ">
                {/* card image */}
                <div className="w-full h-[80%] rounded-xl ">
                    <img className="object-cover w-full h-full rounded-xl " src={spot.previewImage} alt="" />
                </div>
                <div className="grid grid-cols-content gap-1 pt-2">
                    <div className="font-bold">{spot.city}, {spot.state}</div>
                    {avgStarRating && <div className="flex items-center"><img className="h-[12px] w-[12px] mr-1" src={star} alt="" /> {avgStarRating} </div>}
                    {!avgStarRating && <span>New!</span>}
                    <div className="price-container">
                        <span className="font-bold">${spot.price}</span> night
                    </div>
                </div>
            </div>
        </Link>
    )
}
