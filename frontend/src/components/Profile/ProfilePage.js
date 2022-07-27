import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import EditListingModal from "../EditSpotModal";


export default function MangageListings () {
    const sessionUser = useSelector(state => state.session.user)
    const normalizedSpots = useSelector(state => state.spots.normalizedSpots)
    const allSpots = useSelector(state => state.spots.list)
    const allReviews = useSelector(state => state.reviews.list)

    let userSpots
    let userReviews

    if(sessionUser) {
        userSpots = allSpots.filter(el => el.ownerId === sessionUser.id)
        userReviews = allReviews.filter(el => el.userId === sessionUser.id)
    }

    if(!sessionUser) {
        return (
            <Redirect to="/"></Redirect>
        )
    }

    return (
        <div className="page-wrapper">
        <div className="my-listings-container">
        <h1>My Listings</h1>
            <div className="mapped-listings">
                {userSpots.map((spot, i) => (
                    <div key={i}>
                        <h2>{spot.name}</h2>
                        <p>Location: {spot.city}, {spot.state}</p>
                        <p>Description: {spot.description}</p>
                        <p>Price: {spot.price} per night</p>
                        <p>Owner: {spot['Owner.firstName']} {spot['Owner.lastName']} </p>
                        {/* On click of button, open up modal for editing */}
                        <EditListingModal spot={spot} />
                    </div>
                ))}
            </div>
        </div>
        <div className="my-reviews-container">
            <h1>My reviews</h1>
            <div className="mapped-reviews">
            {userReviews.map((review, i) => (
                <div key={i}>
                    <h2>{normalizedSpots[review.spotId].name}</h2>
                    <p>Review: {review.content}</p>
                    <p>Stars: {review.stars}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}
