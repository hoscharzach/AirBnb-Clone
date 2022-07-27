import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'

export default function SpotCard({spotId, spot}) {
    const reviews = useSelector(state => state.reviews.normalizedReviews[spot.id])

    let numReviews
    let avgStarRating

    if (reviews) {
        numReviews = reviews.length
        let sum = reviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0)
        avgStarRating = (sum / numReviews)
    }
    let caption

    if (avgStarRating) {
        caption = (
            {}
        )
    }

    return (
       <Link className="text-link" to={`/spots/${spotId}`}>
        <div className="spot-card-container">
        <div className="spot-display-image">
            <h2>{spot.name}</h2>
        </div>
        <div className="spot-card-caption">
            <div>
             {spot.city}, {spot.state} {avgStarRating &&
             (<div className="star-rating-container">{avgStarRating} <i class="fa-solid fa-star"></i></div>)}
            {!avgStarRating && <p>New!</p>}
            </div>
            </div>
        </div>
       </Link>
    )
}
