import { useDispatch } from 'react-redux'
import { useState } from 'react'
import * as reviewActions from '../../store/reviews'

export default function AddReview ({spot, setShowModal, review, type}) {
    const dispatch = useDispatch()
    console.log(type)

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(review?.stars || 5)
    const [content, setContent] = useState(review?.content || '')

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formErrors = []
        setErrors(formErrors)


        if (formErrors.length === 0) {
            const payload = {
                ...review,
                content,
                stars,
                spotId: spot.id || review.spotId
            }

            if (review) {
                await dispatch(reviewActions.thunkEditReview(payload))
                .catch(
                    async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        console.log(errors)
                    }
                    }
                )
                if (errors.length === 0) {
                    setShowModal(false)
                }

            } else {
                await dispatch(reviewActions.thunkCreateReview(payload))
                .catch(
                    async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    }
                );

                if (errors.length === 0) {
                    setShowModal(false)
                }
            }

        }
    }

    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)

    return (

        <div className='add-review-container'>
            <ul className='add-review-errors'>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        <h1 className='add-review-title'>Add Review</h1>
            <form onSubmit={onSubmit}>
                <textarea required className='content-field' placeholder="review" value={content} onChange={contentChange} ></textarea>
                <input type="number" required placeholder="stars" value={stars} onChange={starsChange}></input>
                <button type="submit">Leave Review</button>
            </form>
        </div>
    )
}
