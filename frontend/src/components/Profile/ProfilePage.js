import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import './profile.css'
import SpotCard from "../SpotCards";
import ReviewCard from "../ReviewCard";

export default function MangageListings() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots.normalizedSpots)


    const [userSpots, setUserSpots] = useState([])

    // useEffect(() => {
    //     if (allSpots && sessionUser) {
    //         const userSpots = Object.values(allSpots).filter(el => el.ownerId === sessionUser.id)
    //         setUserSpots(userSpots)
    //     }

    //     if (allSpots && sessionUser) {
    //         const userReviews = Object.values(allReviews).filter(el => el.userId === sessionUser.id)
    //         setUserReviews(userReviews)
    //     }
    // }, [sessionUser, allSpots, allReviews])

    if (!sessionUser) {
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
                    {userSpots && userSpots.map(spot => (
                        <SpotCard type={'profile'} key={spot.id} spotId={spot.id} spot={spot} />
                    ))}
                </div>
            </div>
            <div className="profile-header-container">
                <h1 className="profile-title">Your Reviews</h1>
            </div>
            {/* <div className="spot-display-review-wrapper">

                <div className="spot-reviews-display">
                    {userReviews?.length > 0 && userReviews.map((el, i) => (
                        <Link key={i} to={`/spots/${el.spotId}`}> <ReviewCard from={'profile'} className="review-component" review={el} /></Link>
                    ))}
                </div>
            </div> */}
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
