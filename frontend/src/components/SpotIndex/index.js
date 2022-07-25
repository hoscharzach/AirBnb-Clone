import { useSelector } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"

export default function SpotIndex () {
    const spots = useSelector(state => state.spots.list)

    return (
        <div className="spot-display-container">
            {spots.map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} />
            ))}
        </div>
    )
}
