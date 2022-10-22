import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import * as reviewActions from '../../store/spots'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'
import star from '../../assets/images/icons/svgexport-14.svg'
import filledStar from '../../assets/images/icons/filledstar.svg'


export default function AddReview({ spot, setShowModal, review }) {
    const dispatch = useDispatch()

    const initialStars = new Array(4).fill(star)
    initialStars.unshift(filledStar)


    const [errors, setErrors] = useState([])
    const [content, setContent] = useState(review?.content || '')
    const [rating, setRating] = useState(review?.stars || 1)
    const [starsArray, setStarsArray] = useState(initialStars)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)

    const clickX = (e) => {
        setShowModal(false)
    }

    useEffect(() => {
        const errors = []
        if (content.length < 10) errors.push('Review must be at least 10 characters')
        setErrors(errors)

    }, [content])

    const onEditSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        setErrors([])
        if (errors.length === 0) {
            const payload = {
                ...review,
                content,
                stars: rating
            }
            dispatch(reviewActions.thunkEditReview(payload))
                .then(() => setShowModal(false))
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
        }
    }

    const onSubmit = async (e) => {
        setHasSubmitted(true)
        e.preventDefault()

        const payload = {
            content,
            stars: rating,
            spotId: spot.id
        }

        dispatch(reviewActions.thunkCreateReview(payload))
            .then(() => setShowModal(false))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                })

    }


    const contentChange = (e) => setContent(e.target.value)

    return (
        <>
            {/* entire modal */}
            <div className='w-[90vw] max-w-[600px] flex flex-col'>
                {/* header */}
                <div className='h-[50px] flex items-center border-b px-5'>
                    <button className='w-max hover:bg-slate-300 p-2 rounded-full' onClick={clickX} ><img className="h-[14px] w-[14px]" src={x} alt=""></img></button>
                    <div className='flex justify-center w-full'>

                        <h2 className='text-lg relative right-4'>
                            {review ? 'Edit Review' : 'Add Review'}
                        </h2>
                    </div>
                </div>
                <div className='p-2'>

                    <div className='flex flex-col items-center'>
                        <div className='my-3 text-md text-red-600'>
                            {errors.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </div>
                        <form className='flex flex-col w-full'>
                            <div className='text-lg font-bold text-left mb-3'>Let others know about your experience</div>
                            <textarea rows={4} className='p-2 w-4/5 border rounded-lg' placeholder="Leave your review here..." value={content} onChange={contentChange} ></textarea>
                            <div className='flex gap-1 my-4 items-center'> {starsArray && starsArray.map((star, i) => <img className='hover:fill-slate-500' key={i} onClick={() => setRating(i + 1)} src={rating >= i + 1 ? filledStar : star}></img>)}</div>
                            <button disabled={errors.length > 0} className='airbnb-button text-white p-3 rounded-xl my-2 disabled:opacity-60' type="submit" onClick={review ? onEditSubmit : onSubmit} >{review ? 'Submit Changes' : 'Leave Review'}</button>
                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}
