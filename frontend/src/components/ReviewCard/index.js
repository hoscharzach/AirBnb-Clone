import { useSelector } from 'react-redux'
import DeleteReviewModal from '../DeleteReviewModal'
import EditReviewModal from '../EditReviewModal'
import './reviewcard.css'
import icon from '../../assets/images/icons/svgexport-7.svg'
import star from '../../assets/images/icons/svgexport-14.svg'

export default function ReviewCard({ review }) {
    const sessionUser = useSelector(state => state.session.user)
    const reviewDate = new Date(review.createdAt)
    const month = reviewDate.getMonth()
    const year = reviewDate.getFullYear()


    let reviewButtons
    if (sessionUser?.id === review.userId)
        reviewButtons = (
            <>
                <EditReviewModal review={review} />
                <DeleteReviewModal review={review} />
            </>
        )

    return (
        <div className='w-full flex flex-col lg:w-2/4'>
            <div className='flex mb-4'>
                <img src={icon}></img>
                <div className='flex flex-col ml-3'>
                    <div>{review.User.firstName} {review.User.lastName}</div>
                    <div>{`${month} ${year}`}</div>
                </div>
            </div>
            <div>{review.content}</div>
        </div>
    )
}
