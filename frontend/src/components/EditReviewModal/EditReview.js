import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as reviewActions from '../../store/reviews'

export default function EditReview ({review, setShowModal}) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(review?.stars || '')
    const [content, setContent] = useState(review?.content || '')
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = []
            if (content.length < 10) errors.push('Review must be at least 10 characters')
            if (stars < 1 || stars > 5) errors.push('Rating must be between 1 and 5')
            setErrors(errors)

            if (errors.length > 0 && hasSubmitted === true) {
                setDisableSubmit(true)
            } else setDisableSubmit(false)

    }, [content, stars])

    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (errors.length === 0) {
            const payload = {
                ...review,
                content,
                stars
            }
            await dispatch(reviewActions.thunkEditReview(payload))
                .then(() => setShowModal(false))
                .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        }
    }

    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)


    return (

        <div className='edit-review-modal-container'>
            <ul className='edit-review-modal-errors'>
                {hasSubmitted && errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        <h1 className='edit-review-modal-form'>Edit Review</h1>
            <form onSubmit={onSubmit}>
                <input required placeholder="Description" value={content} onChange={contentChange} ></input>
                <input type="number" maxLength={1} required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                <button type="submit" disabled={disableSubmit}>Submit Changes</button>
            </form>
        </div>
    )
}
