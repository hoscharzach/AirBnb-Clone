import { useSelector } from 'react-redux'
import DeleteReviewModal from '../DeleteReviewModal'
import EditReviewModal from '../EditReviewModal'
import './reviewcard.css'
import icon from '../../assets/images/icons/svgexport-7.svg'
import star from '../../assets/images/icons/svgexport-14.svg'

export default function ReviewCard ({review}) {
    const sessionUser = useSelector(state => state.session.user)
    const updateReview = useSelector(state => state.reviews.normalizedReviews[review.id])

    let reviewButtons
    if (sessionUser?.id === review?.userId) {
        reviewButtons = (
            <>
            <EditReviewModal review={review} />
            <DeleteReviewModal review={review} />
            </>
        )
    } else {
        reviewButtons = (
            <button className='place-holder-button'></button>
        )
    }
    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="review-card-user-info-container">
                    <div className="review-card-user-icon"><img className="review-card-user-icon-image" src={icon}></img></div>
                    <div className="review-card-username-rating">
                        <div><h4>{review.User.firstName}</h4></div>
                        <div className='review-card-stars-icon'>{review.stars} <img className="review-card-star" src={star}></img></div>
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
{/*
        // <div className="review-card">

        //     <div className='review-user-info-container'></div>
        //     <div className='review-user-icon'><i className="fa-solid fa-user-check"></i></div>
        //     <div>Rating: {review.stars}</div>
        //     <div>User: {review.User.firstName}</div>
        //     <div>Review: {review.content}</div>
        //     {sessionUser && review.userId === sessionUser.id && <EditReviewModal review={review} spotId={review.spotId} type={type}/>}
        //     {sessionUser && review.userId === sessionUser.id && <DeleteReviewModal review={review} />}
        // </div> */}
