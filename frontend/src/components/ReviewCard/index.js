import { useSelector } from 'react-redux'
import DeleteReviewModal from '../DeleteReviewModal'
import EditReviewModal from '../EditReviewModal'
import { format } from 'date-fns'
import icon from '../../assets/images/icons/svgexport-7.svg'
import { useState } from 'react'

export default function ReviewCard({ review }) {
    const sessionUser = useSelector(state => state.session.user)

    const [showMore, setShowMore] = useState(false)
    let reviewButtons
    if (sessionUser?.id === review?.userId) {
        reviewButtons = (
            <div className='flex gap-2'>
                <EditReviewModal review={review} />
                <DeleteReviewModal review={review} />
            </div>
        )
    }
    let content
    if (review) {
        if (review.content.length > 200 && !showMore) {
            content = (<>{review.content.slice(0, 200)} <span onClick={() => setShowMore(true)} className='text-sm underline hover:cursor-pointer'>Show more...</span></>)
        } else if (review.content.length > 200 && showMore) {
            content = (<>{review.content} <span onClick={() => setShowMore(false)} className='text-sm underline hover:cursor-pointer'>Show less</span> </>)
        } else {
            content = review.content
        }
    }

    return (
        <>
            {review &&
                <div className='w-full flex flex-col  p-4 rounded-2xl border hover:shadow-lg'>
                    {/*  */}
                    <div className='flex mb-4 justify-between'>
                        <div className='flex'>
                            <img className='w-[40px] h-[40px] rounded-full' src={review.User.profilePic || icon}></img>
                            <div className='flex flex-col ml-3'>
                                <div className='font-semibold'>{review.User.firstName}</div>
                                <div className='text-slate-500'>{format(new Date(review.createdAt), 'MMMM yyyy')}</div>
                            </div>
                        </div>
                        <div>
                            {reviewButtons}
                        </div>
                    </div>
                    <div className='break-words'>{content}</div>
                </div>
            }
        </>
    )
}
