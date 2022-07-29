import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'

export default function SpotCard({spotId, spot}) {

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

    return (
        <div className="spot-card-container">
            <Link className="text-link" to={`/spots/${spotId}`}>
            <div className="spot-display-image">
                <img className="preview-image" src={spot.previewImage} alt=""/>
            </div>
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
       </Link>
        </div>
    )
}
