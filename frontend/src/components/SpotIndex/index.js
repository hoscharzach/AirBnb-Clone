import { useSelector } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"


export default function SpotIndex() {
    const spots = useSelector(state => state.spots.normalizedSpots)


    return (
        <div className=" w-11/12 grid grid-cols-index gap-4 auto-rows-index mt-6">
            {Object.values(spots).map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} spot={spot} />
            ))}

        </div>
    )
}
