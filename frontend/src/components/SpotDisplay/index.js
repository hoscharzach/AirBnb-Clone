import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import EditListingModal from "../EditSpotModal"


export default function SpotDisplay () {
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])

    if (!spot) return null

    return (
        <div className="main-spot-container">
            <h1>{spot.name}</h1>
            <p>Address: {spot.address}</p>
            <p>Price: {spot.price}</p>
            <p>Description: {spot.description} </p>
            <p>OwnerId: {spot.ownerId}</p>
            <p>Listed by: {spot['Owner.firstName']} {spot['Owner.lastName']} </p>
            {/* <img src={spot.previewImage} alt={" "} ></img> */}

            <br></br>
            {sessionUser && spot && <EditListingModal spot={spot}/>}
        </div>
    )
}
