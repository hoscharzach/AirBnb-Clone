import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddReviewModal from "../AddReviewModal"
import DeleteListingModal from "../DeleteListingModal"
import EditListingModal from "../EditSpotModal"
import ReviewCard from "../ReviewCard"
import './spot-display.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import avatar from '../../assets/images/icons/svgexport-7.svg'


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

            <div className="outer-spot-info-container">
                <div className="inner-spot-info-container">
                    <div className="spot-name-container">
                        <h1>{spot.name}</h1>
                    </div>
                    <div className="spot-reviews-and-location">
                        {reviews && <span className="reviews-location-text"><img className="top-div-star" src={star}></img> {avgStarRating} · {numReviews}  Review(s) <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}</span>}
                    </div>


                </div>
            </div>

            <div className="spot-images-container">
                <img className="main-spot-image" src={spot.previewImage} alt="" ></img>
            </div>

            <div className="below-image-container">
                <div className="hosted-by-price-container">
                    <div className="hosted-by-text">{spot.name} hosted by {spot['Owner.firstName']}</div>
                    <div className="under-image-price-text"><span className="under-image-spot-price-text">${spot.price}</span> night</div>
                </div>
                <div className="avatar-and-buttons-wrapper">
                    <img className="user-avatar" src={avatar} alt=""></img>
                    <div className="edit-delete-buttons">
                        {sessionUser && spot && sessionUser.id === spot.ownerId && <EditListingModal spot={spot}/>}
                        {sessionUser && spot && sessionUser.id === spot.ownerId && <DeleteListingModal redirect={'/'} spot={spot} />}
                    </div>
                </div>
            </div>
            <div className="spot-display-review-wrapper">
                <div className="reviews-container">
                {reviews && (<h2><img className="bottom-reviews-star" src={star}></img> {avgStarRating} · {numReviews} Reviews</h2>)}
                {!reviews && <h2>Be the first to review this spot!</h2>}
                { sessionUser && showAddReview && !userOwnsSpot && <AddReviewModal spot={spot} />}
                    {reviews && reviews.map((review, i) => (
                        <ReviewCard key={i} className="review-component" review={review}/>
                        ))}
                </div>
            </div>
        </div>
    )
}
