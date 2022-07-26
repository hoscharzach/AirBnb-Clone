import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"


export default function SpotDisplay () {
    const { spotId } = useParams()
    const sessionuser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])
    const dispatch = useDispatch()

    useEffect(() => {
        //
    }, [dispatch])

    return (
        <div className="main-spot-container">
            <h1>{spot.name}</h1>
            <p>{spot.address}</p>
            <p>{spot.price}</p>
            <p>{spot.description} </p>
            <p>OwnerId: {spot.ownerId}</p>
            <img src={spot.previewImage} alt={" "} ></img>
            <br></br>
            {sessionuser.id === spot.id && <button>Edit Listing</button>}
        </div>
    )
}
