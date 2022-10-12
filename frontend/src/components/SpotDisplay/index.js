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

export default function SpotDisplay() {
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])

    let owner
    if (spot) {
        owner = spot['Owner.firstName']
    }

    const allReviews = useSelector(state => state.reviews.normalizedReviews)
    const reviews = Object.values(allReviews).filter(review => review?.spotId === spot?.id)

    const [userOwnsSpot, setUserOwnsSpot] = useState(false)
    const [showAddReview, setShowAddReview] = useState(true)

    // every time sessionUser or current spot state change, check if sessionUser owns the spot
    useEffect(() => {
        if (sessionUser && spot) {
            sessionUser.id === spot.ownerId ? setUserOwnsSpot(true) : setUserOwnsSpot(false)
        }
    }, [sessionUser, spot])

    // check for reviews that exist by user
    useEffect(() => {
        if (reviews && sessionUser) {
            const userReview = reviews.find(review => review?.userId === sessionUser?.id)
            userReview !== undefined ? setShowAddReview(false) : setShowAddReview(true)
        }
    }, [sessionUser, reviews])

    let avgStarRating
    let numReviews

    if (reviews && reviews.length > 0) {
        numReviews = reviews.length
        let sum = reviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0)
        avgStarRating = (sum / numReviews).toFixed(2)
        if (avgStarRating === Math.floor(avgStarRating)) avgStarRating += ".0"
    }


    if (!spot) return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '500px', alignItems: 'center' }}>
            <h1>Spot doesn't exit</h1>
        </div>
    )

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
                {!userOwnsSpot && sessionUser && <AddReviewModal user={sessionUser} spot={spot} />}
            </div>
        )
    } else {
        reviewsHeader = (
            null
        )
    }

    return (
        <div className="w-4/5 flex flex-col justify-start ">

            <div className="">
                <div className="w-full">
                    <div className="spot-name-container">
                        <h1 className="font-bold text-4xl pb-2" >{spot.name}</h1>
                    </div>
                    <div className="flex w-full ">
                        {reviews.length > 0 && <div className="w-full flex items-center child:pr-1 ">
                            <img className="w-[16px] h-[16px] inline-block" src={star} alt="" ></img> {avgStarRating} · {numReviews}  Review(s) <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}
                        </div>}
                        {!reviews.length > 0 && <span className=""><img className="" src={star} alt=""></img> No Reviews <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}</span>}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-2 mt-8 sm:grid-cols-1 md:grid-cols-1 ">
                <img className="w-full rounded-2xl object-cover h-[500px] sm:w-full md:w-full" src={spot.previewImage} alt="" ></img>
                <div className="grid grid-cols-2 gap-2 h-[500px] child:object-cover child:rounded-xl lg:grid xl:grid 2xl:grid child:h-full md:hidden sm:hidden " >
                    <img src={spot.previewImage} ></img>
                    <img src={spot.previewImage} ></img>
                    <img src={spot.previewImage} ></img>
                    <img src={spot.previewImage} ></img>

                </div>
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
                            <EditListingModal spot={spot} />
                            <DeleteListingModal redirect={'/'} spot={spot} />
                        </div>}
                </div>
            </div>
            <div className="description-container">
                <div className="inner-description-container">

                    <div className="description-header">
                        <h2>Description</h2>
                    </div>
                    <div>
                        <p className="description-body">
                            {spot.description}
                        </p>
                    </div>

                </div>
            </div>
            <div className="spot-display-review-wrapper">
                {reviewsHeader}
                <div className="spot-reviews-display">
                    {reviews.length > 0 && reviews.map((review, i) => (
                        <ReviewCard key={i} className="review-component" review={review} />
                    ))}
                </div>
            </div>
        </div>
    )
}
