import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './spot-display.css'

export default function SpotDisplay () {
    const spots = useSelector(state => state.spots.list)
    return (
        <div className="spot-display-container">
            {spots.map(spot => (
                <Link to={`/spot/${spot.id}`}>
                    <div className="spot-display-image">
                    <h2>{spot.name}</h2>
                        <p>{spot.city}, {spot.state}</p>
                        </div>
                </Link>

                //combine all of this into a spot display component and render those instead
            ))}
        </div>
    )
}
