import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'

export default function SpotCard({spotId}) {
    const spot = useSelector(state => state.spots.normalizedSpots[spotId])

    return (
       <Link to={`/spots/${spotId}`}>
        <div className="spot-display-image">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}</p>
        </div>
       </Link>
    )
}
