import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import EditListingModal from "../EditSpotModal"
import ReviewCard from "../ReviewCard"


export default function SpotDisplay () {
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])
    const reviews = useSelector(state => state.reviews.normalizedReviews[Number(spotId)])
    console.log(reviews)
    if (!spot) return null

    return (
        <div className="main-display-container">
            <div className="spot-info-container">
                <h1>{spot.name}</h1>
                <p>Address: {spot.address}</p>
                <p>Price: {spot.price}</p>
                <p>Description: {spot.description} </p>
                <p>OwnerId: {spot.ownerId}</p>
                <p>Listed by: {spot['Owner.firstName']} {spot['Owner.lastName']} </p>
                {/* <img src={spot.previewImage} alt={" "} ></img> */}

                {sessionUser && spot && sessionUser.id === spot.ownerId && <EditListingModal spot={spot}/>}
            </div>
            <div className="spot-images-container">
                Images here
            </div>
            <div className="reviews-container">
                <h1>Reviews</h1>
                {reviews && reviews.map((review, i) => (
                    <ReviewCard key={i} className="review-component" review={review}/>
                    ))}

            </div>
        </div>
    )
}
