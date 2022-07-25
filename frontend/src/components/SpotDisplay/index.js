import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function SpotDisplay () {
    const { spotId } = useParams()

    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])
    return (
        <div className="main-spot-container">
            <h1>{spot.name}</h1>
            <p>{spot.address}</p>
            <p>{spot.price}</p>
            <p>{spot.description} </p>
            {/* <img src={spot.previewImage} alt={" "} ></img> */}
        </div>
    )
}
