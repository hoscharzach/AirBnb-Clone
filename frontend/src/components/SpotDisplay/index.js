import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddReviewModal from "../AddReviewModal"
import DeleteListingModal from "../DeleteListingModal"
import EditListingModal from "../EditSpotModal"
import ReviewCard from "../ReviewCard"
import './spot-display.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import avatar from '../../assets/images/icons/svgexport-7.svg'
import * as spotActions from '../../store/spots'


export default function SpotDisplay () {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])
    const owner = spot?.['Owner.firstName']
    // console.log(spot)

    useEffect(() => {
        dispatch(spotActions.thunkLoadAllSpots())
    },[dispatch])

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


    //determine what reviews header will look like, depending on if user owns spot or has already left a review
    let reviewsHeader

    if (reviews.length > 0) {
        reviewsHeader = (
            <div className="spot-display-review-header">
            <h2><img className="bottom-reviews-star" src={star} alt="" ></img> {avgStarRating} · {numReviews} Reviews</h2>
            {!userOwnsSpot && showAddReview && sessionUser && <AddReviewModal user={sessionUser} spot={spot} />}
            </div>
        )
    } else if (reviews.length === 0) {
        reviewsHeader = (
            <div className="spot-display-review-header">
                <h2>No Reviews</h2>
                {sessionUser && <AddReviewModal user={sessionUser} spot={spot} />}
            </div>
        )
    } else {
        reviewsHeader = (
            null
        )
    }

    return (
        <div className="main-display-container">

            <div className="outer-spot-info-container">
                <div className="inner-spot-info-container">
                    <div className="spot-name-container">
                        <h1>{spot.name}</h1>
                    </div>
                    <div className="spot-reviews-and-location">
                        {reviews.length > 0 && <span className="reviews-location-text"><img className="top-div-star" src={star} alt="" ></img> {avgStarRating} · {numReviews}  Review(s) <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}</span>}
                        {!reviews.length > 0 && <span className="reviews-location-text"><img className="top-div-star" src={star} alt=""></img> No Reviews <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}</span>}
                    </div>
                </div>
            </div>

            <div className="spot-images-container">
                <img className="main-spot-image" src={spot.previewImage} alt="" ></img>
            </div>

            <div className="below-image-container">
                <div className="hosted-by-price-container">
                    <div className="hosted-by-text">{spot.name} hosted by {owner}</div>
                    <div className="under-image-price-text"><span className="under-image-spot-price-text">${spot.price}</span> night</div>
                </div>
                <div className="avatar-and-buttons-wrapper">
                    <img className="user-avatar" src={avatar} alt=""></img>
                    {/* {if logged in and there's a spot and the user owns this location, render buttons} */}
                    {sessionUser && spot && sessionUser.id === spot.ownerId &&
                    <div className="edit-delete-buttons">
                        <EditListingModal spot={spot}/>
                        <DeleteListingModal redirect={'/'} spot={spot} />
                    </div>}
                </div>
            </div>
            <div className="spot-display-review-wrapper">
                {reviewsHeader}
                <div className="spot-reviews-display">
                    {reviews.length > 0 && reviews.map((review, i) => (
                        <ReviewCard key={i} className="review-component" review={review}/>
                        ))}
                </div>
            </div>
        </div>
    )
}
