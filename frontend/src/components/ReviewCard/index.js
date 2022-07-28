import { useSelector } from 'react-redux'
import AddReviewModal from '../AddReviewModal'
import './reviewcard.css'

export default function ReviewCard ({review}) {
    const type = "Edit"
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div className="review-card">
            <div className='review-user-icon'><i className="fa-solid fa-user-check"></i></div>
            <div>Rating: {review.stars}</div>
            <div>User: {review.User.firstName}</div>
            <div>Review: {review.content}</div>
            {sessionUser && review.userId === sessionUser.id && <AddReviewModal review={review} spotId={review.spotId} type={type}/>}
            {sessionUser && review.userId === sessionUser.id && <button>Delete Review</button>}
        </div>
        )
    }
