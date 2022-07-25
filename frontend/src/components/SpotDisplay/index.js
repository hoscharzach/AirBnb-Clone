import { useSelector } from "react-redux"
import './spot-display.css'

export default function SpotDisplay () {
    const spots = useSelector(state => state.spots.list)
    return (
        <div className="spot-display-container">
            {spots.map(spot => (
                <div className="spot-display-image">
                    <h2>{spot.name}</h2>
                        <p>{spot.city}, {spot.state}</p></div>
            ))}
        </div>
    )
}
