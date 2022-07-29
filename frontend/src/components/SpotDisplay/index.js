import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddReviewModal from "../AddReviewModal"
import DeleteListingModal from "../DeleteListingModal"
import EditListingModal from "../EditSpotModal"
import ReviewCard from "../ReviewCard"
import './spot-display.css'


export default function SpotDisplay () {
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])

    const allReviews = useSelector(state => state.reviews.normalizedReviews)
    const reviews = Object.values(allReviews).filter(review => review?.spotId === spot?.id)

    let userReview
    let userOwnsSpot

    if (sessionUser) {
       userOwnsSpot = spot?.ownerId === sessionUser?.id
       userReview = reviews.find(review => review?.userId === sessionUser?.id)
    }

    const [showAddReview, setShowAddReview] = useState(true)

    let avgStarRating
    let numReviews

    if (reviews && reviews.length > 0) {
        numReviews = reviews.length
        let sum = reviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0)
        avgStarRating = (sum / numReviews).toFixed(2)
        if(avgStarRating === Math.floor(avgStarRating)) avgStarRating += ".0"
    }

    // check for reviews that exist by user
    useEffect(() => {
        userReview !== undefined ? setShowAddReview(false) : setShowAddReview(true)
    }, [userReview])

    if (!spot) return null

    return (
        <div className="main-display-container">
            <div className="spot-info-container">
                <h2>{spot.name}</h2>
                <p>Address: {spot.address}</p>
                <p>Price: {spot.price}</p>
                <p>Description: {spot.description} </p>
                <p>OwnerId: {spot.ownerId}</p>
                <h2>{spot.name} hosted by {spot['Owner.firstName']} {spot['Owner.lastName']} </h2>
                {/* <img src={spot.previewImage} alt={" "} ></img> */}

                {sessionUser && spot && sessionUser.id === spot.ownerId && <EditListingModal spot={spot}/>}
                {sessionUser && spot && sessionUser.id === spot.ownerId && <DeleteListingModal redirect={'/'} spot={spot} />}
            </div>
            <div className="spot-images-container">
                Images here
            </div>
            <div className="reviews-container">
               {reviews && (<h2><i className="fa-solid fa-star"></i> {avgStarRating} ● {numReviews}  Reviews</h2>)}
               {!reviews && <h2>No Reviews</h2>}
               { sessionUser && showAddReview && !userOwnsSpot && <AddReviewModal spot={spot} />}
                {reviews && reviews.map((review, i) => (
                    <ReviewCard key={i} className="review-component" review={review}/>
                    ))}

            </div>
        </div>
    )
}
