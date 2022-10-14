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
            <h1>Spot doesn't exist</h1>
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
    let test = new Array(4).fill(spot.previewImage)

    return (
        <>
            {spot &&

                <div className="w-4/5 lg:max-w-[1200px] flex flex-col justify-start max-w-[1200px] ">
                    <div className="text-base font-semibold" >
                        <div className="w-full">
                            <div className="flex justify-start items-center spot-name-container">
                                <h1 className="font-bold text-4xl pb-2" >{spot.name}</h1>
                            </div>
                            <div className="flex w-full items-center justify-between ">
                                <div className="w-full flex items-center h-[24px] whitespace-nowrap overflow-hidden ">
                                    <span className="flex items-center ">
                                        <div className="flex items-center mr-2">
                                            <img className="w-[14px] h-[14px]" src={star} alt="" ></img>
                                        </div><span className="mr-1"> {avgStarRating} · </span><span className="underline underline-offset-2">{reviews.length > 0 ? numReviews + ' Reviews' : 'No Reviews'} </span>
                                    </span>
                                    <span className="hidden sm:block mx-5">·</span>
                                    <span className="hidden sm:block underline underline-offset-2"> {spot.city}, {spot.state}, {spot.country}
                                    </span>
                                </div>
                                {/* {!reviews.length > 0 && <span className="w-full flex items-center h-[24px]"><img className="w-[14px] h-[14px]" src={star} alt=""></img> No Reviews <span className="dot-add-padding">·</span> {spot.city}, {spot.state}, {spot.country}</span>} */}
                                <div className="child:ml-2 flex justify-evenly">

                                    <button className="min-w-[64px] airbnb-button p-2 rounded-xl text-white active:translate-y-0.5 active:translate-x-0.5">Edit</button>
                                    <button className="min-w-[64px] active:translate-x-0.5 active:translate-y-0.5 airbnb-button p-2 rounded-xl text-white">Delete</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* image container */}
                    <div className="mt-2 flex gap-1 max-w-4/5 max-h-[500px] before:content-[''] before:h-0 before:w-0 before:pb-[75%]">
                        <div className="w-full h-full lg:w-6/12 lg:grid lg:grid-col-2 gap-1">
                            <img className="rounded-2xl w-full h-full md:rounded-l-2xl lg:rounded-r-none object-cover" src={spot.previewImage} alt="" ></img>
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-image-grid lg:w-6/12 lg:gap-1" >
                            {test.map((el, i) => (
                                <div key={i} className="">
                                    <img className="object-cover h-full rounded-md object-center" src={el}></img>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Under image container */}
                    <div className="w-full mt-12 gap-3 flex flex-col md:flex-row">
                        {/* information container */}
                        <div className="w-full lg:w-3/5">
                            <h2 className="text-2xl font-semibold">Entire guest suite hosted by Brad</h2>
                            <div className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                        {/* bookings container */}
                        <div className="w-full lg:w-2/5 flex justify-center md:justify-end">
                            {/* bookings box */}
                            <div className="mt-6  md:m-0 w-full border h-[485px] max-w-[372px] rounded-2xl p-6 shadow-xl child:my-4">
                                {/* price and star reviews */}
                                <div className="flex items-center w-full justify-between">
                                    <div>$139 night</div>
                                    <div className="flex items-center"><img alt="" className="w-[14px] h-[14px]" src={star}></img>4.81 · 53 reviews</div>
                                </div>
                                {/* booking date inputs*/}
                                <div className="w-full border h-[56px] rounded-2xl "></div>
                                {/* reserve button */}
                                <button className="button-text w-full airbnb-button text-white h-[48px] rounded-lg active:translate-x-0.5 active:translate-y-0.5">Reserve</button>
                                <div>You won't be charged yet</div>
                                <div className="flex justify-between">
                                    <span>$607 x 5 nights</span>
                                    <span>$3,306</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Long stay discount</span>
                                    <span>-$607</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* reviews container */}
                    <div className="h-[150px] w-full flex items-center justify-center border mt-5">
                        Reviews
                    </div>
                </div>
            }</>
    )
}
