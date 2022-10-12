import { useSelector } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"


export default function SpotIndex() {
    const spots = useSelector(state => state.spots.normalizedSpots)


    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="w-4/5 grid-cols-6 ">

            {Object.values(spots).map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} spot={spot} />
            ))}

        </div>
    )
}
