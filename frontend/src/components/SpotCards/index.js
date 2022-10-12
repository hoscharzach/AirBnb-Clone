import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import EditListingModal from "../EditSpotModal"
import DeleteListingModal from "../DeleteListingModal"


export default function SpotCard({ spotId, spot, type }) {

    // adding change here

    const allReviews = useSelector(state => state.reviews.normalizedReviews)
    const reviews = Object.values(allReviews).filter(review => spot.id === review.spotId)

    let numReviews = 0
    let avgStarRating

    if (reviews.length > 0) {
        numReviews = reviews.length
        let sum = reviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0)
        avgStarRating = (sum / numReviews)
    }

    let captionContainer
    if (type === 'profile') {
        captionContainer = (
            <div className="profile-spot-caption">

                <div className="profile-caption-top-line">
                    <div>{spot.name}</div>
                    <div className="profile-edit-delete-buttons-container">
                        <EditListingModal spot={spot} />
                        <DeleteListingModal spot={spot} />
                    </div>
                </div>

                <div className="profile-caption-bottom-line">
                    <div>{spot.city}, {spot.state}</div>
                </div>
            </div>
        )

    } else {
        captionContainer = (
            <div className="spot-card-caption">
                <div className="location-stars-container">
                    <span className="city-state-text">{spot.city}, {spot.state}</span> {avgStarRating &&
                        (<span className="star-rating-container"><img className="star-icon" src={star} alt="" /> {avgStarRating.toFixed(2)} </span>)}
                    {numReviews === 0 && <span>New</span>}
                </div>
                <div className="price-container">
                    <span className="price-text">${spot.price}</span> night
                </div>
            </div>
        )
    }

    return (
        <Link >
            <div className="h-[365px] w-full">
                <div className="w-full h-[256px] rounded-md ">
                    <img className="object-cover w-full h-full rounded-lg " src={spot.previewImage} alt="" />
                </div>
                {captionContainer}
            </div>
        </Link>
    )
}
