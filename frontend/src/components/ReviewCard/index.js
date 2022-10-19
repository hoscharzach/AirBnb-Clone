import { useSelector } from 'react-redux'
import DeleteReviewModal from '../DeleteReviewModal'
import EditReviewModal from '../EditReviewModal'
import './reviewcard.css'
import { format } from 'date-fns'
import icon from '../../assets/images/icons/svgexport-7.svg'
import star from '../../assets/images/icons/svgexport-14.svg'

export default function ReviewCard({ review }) {
    const sessionUser = useSelector(state => state.session.user)
    const reviewDate = new Date(review.createdAt)
    console.log("REVIEW", review)
    let reviewButtons
    if (sessionUser?.id === review?.userId) {
        reviewButtons = (
            <div className='flex gap-2'>
                <EditReviewModal review={review} />
                <DeleteReviewModal review={review} />
            </div>
        )
    }

    return (
        <>
            {review &&
                <div className='w-full flex flex-col lg:w-2/4'>
                    {/*  */}
                    <div className='flex mb-4 justify-between'>
                        <div className='flex'>
                            <img className='w-[40px] h-[40px]' src={icon}></img>
                            <div className='flex flex-col ml-3'>
                                <div className='font-semibold'>{review.User.firstName}</div>
                                <div className='text-slate-500'>{format(new Date(review.createdAt), 'MMMM yyyy')}</div>
                            </div>
                        </div>
                        <div>
                            {reviewButtons}
                        </div>
                    </div>
                    <div>{review.content}</div>
                </div>
            }
        </>
    )
}
