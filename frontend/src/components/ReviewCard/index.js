import { useSelector } from 'react-redux'
import './reviewcard.css'

export default function ReviewCard ({review}) {
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div className="review-card">
            <div className='review-user-icon'><i className="fa-solid fa-user-check"></i></div>
            <div>Rating: {review.stars}</div>
            <div>User: {review.User.firstName} {review.User.lastName}</div>
            <div>Review: {review.content}</div>
            {sessionUser && review.userId === sessionUser.id && <button>Edit Review</button>}
            {sessionUser && review.userId === sessionUser.id && <button>Delete Review</button>}
        </div>
        )
    }
