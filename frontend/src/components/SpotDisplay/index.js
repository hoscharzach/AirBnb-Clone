import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddReviewModal from "../AddReviewModal"
import DeleteListingModal from "../DeleteListingModal"
import EditListingModal from "../EditSpotModal"
import ReviewCard from "../ReviewCard"
import './spot-display.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import avatar from '../../assets/images/icons/svgexport-7.svg'
import { thunkAddBooking } from "../../store/spots"
import { convertISODateToRange } from "../../utils/functions"


export default function SpotDisplay() {
    const { spotId } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.normalizedSpots[Number(spotId)])

    const todayObj = new Date()
    const today = todayObj.toISOString().slice(0, 10)
    let tomorrow = new Date(todayObj.setDate(todayObj.getDate() + 1)).toISOString().slice(0, 10)
    let nextDay = new Date(todayObj.setDate(todayObj.getDate() + 1)).toISOString().slice(0, 10)

    const [userOwnsSpot, setUserOwnsSpot] = useState(false)
    const [showAddReview, setShowAddReview] = useState(true)
    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState(nextDay)
    const [lengthOfStay, setLengthOfStay] = useState(1)
    const [errors, setErrors] = useState([])

    useEffect(() => {

    }, [spot.Reviews])

    useEffect(() => {

        if (startDate > endDate) {
            setEndDate(startDate)
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        const diff = (end - start) / 86400000
        setLengthOfStay(diff.toString())

    }, [startDate, endDate])

    // every time sessionUser or current spot state change, check if sessionUser owns the spot
    useEffect(() => {
        if (sessionUser && spot) {
            sessionUser.id === spot.ownerId ? setUserOwnsSpot(true) : setUserOwnsSpot(false)
        }
    }, [sessionUser, spot])

    // check for reviews that exist by user
    useEffect(() => {
        // if we find a review, don't show add review button
        setShowAddReview(!spot.Reviews.find(rev => sessionUser?.id === rev.userId))
    }, [sessionUser, spot.Reviews])

    const submitBooking = async () => {

        setErrors([])
        const payload = {
            startDate,
            endDate,
            spotId: spot.id
        }

        return dispatch(thunkAddBooking(payload))
            .then(data => history.push('/trips'))
            .catch(async data => {
                const err = await data.json()
                if (err && err.error) {
                    setErrors([
                        err.error,
                        `${convertISODateToRange(err.conflictCheck.startDate, err.conflictCheck.endDate)}`
                    ])
                }
            })
    }


    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    let avgStarRating
    let numReviews

    if (spot.Reviews && spot.Reviews.length > 0) {
        numReviews = spot.Reviews.length
        let sum = spot.Reviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0)
        if (avgStarRating === Math.floor(avgStarRating)) {
            avgStarRating = (sum / numReviews).toFixed(1)
        } else {
            avgStarRating = (sum / numReviews).toFixed(2)
        }
    }


    if (!spot) return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '500px', alignItems: 'center' }}>
            <h1>Spot doesn't exist</h1>
        </div>
    )

    //determine what reviews header will look like, depending on if user owns spot or has already left a review
    let reviewsHeader

    if (spot.Reviews.length > 0) {
        reviewsHeader = (
            <div className="spot-display-review-header">
                <h2><img className="bottom-reviews-star" src={star} alt="" ></img> {avgStarRating} · {numReviews} Reviews</h2>
                {!userOwnsSpot && showAddReview && sessionUser && <AddReviewModal user={sessionUser} spot={spot} />}
            </div>
        )
    } else if (spot.Reviews.length === 0) {
        reviewsHeader = (
            <div className="">
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

                <div className="w-4/5 flex flex-col justify-start max-w-[1200px] ">
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
                                        </div><span className="mr-1"> {avgStarRating} · </span><span className="underline underline-offset-2">{spot.Reviews.length > 0 ? numReviews + ' Reviews' : 'No Reviews'} </span>
                                    </span>
                                    <span className="hidden sm:block mx-5">·</span>
                                    <span className="hidden sm:block underline underline-offset-2"> {spot.city}, {spot.state}, {spot.country}
                                    </span>
                                </div>

                                {/* Edit and Delete Buttons */}
                                {sessionUser?.id === spot.ownerId &&
                                    <div className="child:ml-2 flex justify-evenly">
                                        <EditListingModal spot={spot} />
                                        <DeleteListingModal spot={spot} />
                                    </div>}

                            </div>
                        </div>
                    </div>

                    {/* image container */}
                    <div className="mt-2 flex gap-1 max-h-[600px] h-auto">
                        <div className="w-full max-h-[400px] lg:max-h-[600px] lg:h-full aspect-square lg:w-6/12  ">
                            <img className="rounded-2xl w-full h-full md:rounded-l-2xl lg:rounded-r-none object-cover object-center " src={spot.previewImage} alt="" ></img>
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-image-grid lg:auto-rows-image-grid lg:w-6/12 lg:gap-1 aspect-square " >
                            {test.map((el, i) => (
                                <img key={i} className="object-cover h-full rounded-md object-center aspect-square" src={el}></img>

                            ))}
                        </div>
                    </div>

                    {/* Under image container */}
                    <div className="w-full mt-12 flex flex-col md:flex-row text-lg">
                        {/* information container */}
                        <div className="w-full md:w-3/5 md:pr-10">
                            <h2 className="text-2xl font-semibold">Entire guest suite hosted by Brad</h2>
                            <div className="my-5">
                                <span>4 guests<span className="mx-2">·</span>1 bedroom<span className="mx-2">·</span>2 beds<span className="mx-2">·</span>1 bath</span>
                            </div>
                            <hr className="my-5"></hr>
                            <div className="break-words">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quisnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrudnostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                        {/* bookings container */}
                        <div className="w-full mt-12 md:mt-0 md:w-2/5 flex justify-center md:justify-end">
                            {/* bookings box */}
                            <div className="mt-6  md:m-0 w-full border max-w-[372px] rounded-2xl p-6 shadow-xl child:text-lg child:my-4">
                                {/* price and star reviews */}
                                <div className="flex items-center w-full justify-between md:flex-col md:items-start lg:flex-row lg:justify-between lg:items-center my-0">
                                    <div>
                                        <span className="text-2xl font-bold">${spot.price}</span><span> night</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span><img alt="" className="mb-1 mr-1 w-[14px] h-[14px]" src={star}></img></span>
                                        {spot.Reviews.length > 0 && <><span className="font-semibold">{avgStarRating}</span><span><span className="mx-2">·</span>{spot.Reviews.length} reviews</span></>}
                                        {spot.Reviews.length === 0 && <><span className="font-semibold">New!</span><span><span className="mx-2">·</span>No reviews</span></>}
                                    </div>
                                </div>
                                {/* booking date inputs*/}
                                <div className="w-full gap-2 l rounded-2xl flex flex-col lg:flex-row ">
                                    <div className="flex justify-start flex-col lg:w-2/4">
                                        <label className="w-full">Check-in</label>
                                        <input className="w-full rounded-lg" type="date" min={today} id="start" name="trip-start"
                                            value={startDate} onChange={(e) => {
                                                console.log(e)
                                                console.log(e.target.value)
                                                console.log(e.target)
                                                setStartDate(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-start flex-col lg:w-2/4">
                                        <label className="w-full">Check-out</label>
                                        <input className="w-full rounded-lg" type="date" min={startDate} id="end" name="trip-end"
                                            value={endDate} onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errors &&
                                    <span id="booking-errors" className="flex flex-col justify-center">{errors.map((err, i) => (
                                        <span className="text-base flex items-center justify-center text-red-600" key={i}>{err}</span>
                                    ))}</span>}
                                {/* reserve button */}
                                <button onClick={submitBooking} className="mt-0 button-text w-full airbnb-button text-white h-[48px] rounded-lg active:translate-x-0.5 active:translate-y-0.5">Reserve</button>
                                {/* various price divs */}
                                <div className="flex justify-center">You won't be charged yet</div>
                                <div className="flex justify-between">
                                    <span className="underline">${spot.price} x {lengthOfStay} nights</span>
                                    <span>${spot.price * lengthOfStay}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Cleaning Fee</span>
                                    <span>$120</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Service Fee</span>
                                    <span>$3.50</span>
                                </div>
                                <hr></hr>
                                <div className="flex justify-between my-0">
                                    <span className="font-semibold">Total before taxes</span>
                                    <span>${120 + 3.50 + (spot.price * lengthOfStay)}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* reviews container */}
                    <div className="w-full flex flex-col mt-12">
                        {reviewsHeader}
                        <div className="flex flex-col lg:flex-row">
                            {spot.Reviews && spot.Reviews.map(rev => (
                                <ReviewCard review={rev} />
                            ))}
                        </div>
                    </div>
                </div>
            }</>
    )
}
