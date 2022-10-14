import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import { useEffect, useState } from "react"


export default function SpotCard({ spot }) {

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
            <div className="h-full w-full before:h-0 before:w-0 before:pb-[calc(3/4 * 100%)] lg:max-h-[390px] ">
                {/* card image */}
                <div className="grow rounded-xl h-[85%]">
                    <img className="object-cover w-full h-full rounded-xl flex flex-col  " src={spot.previewImage} alt="" />
                </div>
                <div className="flex flex-col pt-2 grow">
                    <div className="flex items-center justify-between">

                        <div className="font-bold">{spot.city}, {spot.state}</div>
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
