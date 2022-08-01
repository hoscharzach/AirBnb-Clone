import { useSelector } from 'react-redux'
import DeleteReviewModal from '../DeleteReviewModal'
import EditReviewModal from '../EditReviewModal'
import './reviewcard.css'
import icon from '../../assets/images/icons/svgexport-7.svg'
import star from '../../assets/images/icons/svgexport-14.svg'

export default function ReviewCard ({review, from}) {
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots.normalizedSpots)
    // const reviews = useSelector(state => state.reviews.normalizedReviews)

    let reviewButtons
    if (from === 'profile') {
        const spotName = Object.values(allSpots).find(el => el.id === review.spotId)?.name
        reviewButtons = (
            <div>
               Location:
               <br></br>
               {spotName}
            </div>
        )
    }
    else if (sessionUser?.id === review?.userId) {
        reviewButtons = (
            <>
            <EditReviewModal review={review} />
            <DeleteReviewModal review={review} />
            </>
        )
    }

    else {
        reviewButtons = (
            <button className='place-holder-button'></button>
        )
    }
    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="review-card-user-info-container">
                    <div className="review-card-user-icon"><img className="review-card-user-icon-image" src={icon} alt="" ></img></div>
                    <div className="review-card-username-rating">
                        <div><h4>{review.User.firstName}</h4></div>
                        <div className='review-card-stars-icon'>{review.stars} <img className="review-card-star" src={star} alt="" ></img></div>
                    </div>
                </div>
                <div className="review-card-buttons">
                    {reviewButtons}
                </div>
            </div>
            <div className="review-card-body">
                {review.content}
            </div>
        </div>


        )
    }
