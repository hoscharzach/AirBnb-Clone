import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'

export default function SpotCard({spotId, spot}) {
    // const spot = useSelector(state => state.spots.normalizedSpots[spotId])

    return (
       <Link className="text-link" to={`/spots/${spotId}`}>
        <div className="spot-card-container">
        <div className="spot-display-image">
            <h2>{spot.name}</h2>
            <p></p>
        </div>
        <div className="spot-card-caption"></div>
            <p>{spot.city}, {spot.state}</p>
        </div>
       </Link>
    )
}
