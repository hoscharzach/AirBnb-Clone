import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'

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
       <Link className="text-link" to={`/spots/${spotId}`}>
        <div className="spot-card-container">
            <div className="spot-display-image">
                <img className="preview-image" src={spot.previewImage} alt=""/>
            </div>
            <div className="spot-card-caption">
                <div className="location-stars-container">
                {spot.city}, {spot.state} {avgStarRating &&
                (<span className="star-rating-container">{avgStarRating.toFixed(2)} <i className="fa-solid fa-star"></i></span>)}
                {numReviews === 0 && <span>New!</span>}
                </div>
                <div className="price-container">
                    ${spot.price} night
                </div>
            </div>
        </div>
       </Link>
    )
}
