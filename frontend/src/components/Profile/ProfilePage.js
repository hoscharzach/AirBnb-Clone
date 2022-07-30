import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DeleteListingModal from "../DeleteListingModal";
import EditListingModal from "../EditSpotModal";
import './profile.css'
import SpotCard from "../SpotCards";


export default function MangageListings () {
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots.normalizedSpots)
    // const allReviews = useSelector(state => state.reviews.normalizedReviews)

    let userSpots
    // let userReviews

    if(sessionUser) {
        userSpots = Object.values(allSpots).filter(el => el.ownerId === sessionUser.id)
        // userReviews = Object.values(allReviews).filter(el => el.userId === sessionUser.id)
    }

    if(!sessionUser) {
        return (
            <Redirect to="/"></Redirect>
        )
    }

    return (
        <div>
            <div className="profile-header-container">
                <h1 className="profile-title">Your Current Listings</h1>
            </div>

            <div className="spot-display-container">
                <div className="spot-cards-container">
                {userSpots.map(spot => (
                    <SpotCard type={'profile'} key={spot.id} spotId={spot.id} spot={spot}/>
                    ))}
                </div>
            </div>
        </div>










        // <div className="page-wrapper">
        //     <div className="my-listings-container">
        //     <h1>My Listings</h1>
        //         <div className="mapped-listings">
        //             {userSpots.map((spot, i) => (
        //                 <div key={i}>
        //                     <h2>{spot.name}</h2>
        //                     <p>Location: {spot.city}, {spot.state}</p>
        //                     <p>Description: {spot.description}</p>
        //                     <p>Price: {spot.price} per night</p>
        //                     <p>Owner: {spot['Owner.firstName']} {spot['Owner.lastName']} </p>
        //                     <EditListingModal spot={spot} />
        //                     <DeleteListingModal spot={spot} redirect={'/my-profile'} />
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        //     <div className="my-reviews-container">
        //         <h1>My reviews</h1>
        //         <div className="mapped-reviews">
        //         {userReviews.map((review, i) => (
        //             <div key={i}>
        //                 <h2>{allSpots[review.spotId]?.name}</h2>
        //                 <p>Review: {review?.content}</p>
        //                 <p>Stars: {review?.stars}</p>
        //                 <DeleteReviewModal review={review} />
        //                 <EditReviewModal review={review} />
        //             </div>
        //         ))}
        //         </div>
        //     </div>
        // </div>
    )
}
