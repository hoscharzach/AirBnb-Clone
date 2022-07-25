import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function SpotDisplay () {
    const spotId = useParams()

    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])
    console.log(spot)
    return (
        <div className="main-spot-container">
            <h1>SpotDisplay</h1>
            <p>{spot.name}</p>
            <p>{spot.address}</p>
            <p>{spot.cost}</p>
        </div>
    )
}
