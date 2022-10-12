import { useSelector } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"


export default function SpotIndex() {
    const spots = useSelector(state => state.spots.normalizedSpots)


    return (
        <div className="spot-grid">
            {Object.values(spots).map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} spot={spot} />
            ))}

        </div>
    )
}
