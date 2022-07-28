import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as reviewActions from '../../store/reviews'

export default function EditReview ({review, setShowModal}) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(review?.stars || '')
    const [content, setContent] = useState(review?.content || '')
    const [disableSubmit, setDisableSubmit] = useState(false)

    useEffect(() => {
        const formErrors = []
            if (content.length < 10) formErrors.push('Review must be at least 10 characters')
            if (stars < 0 || stars > 5) formErrors.push('Stars must be between 0 and 5.')
            setErrors(formErrors)
            errors.length > 0 ? setDisableSubmit(true) : setDisableSubmit(false)
    }, [content, stars, errors.length])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            ...review,
            content,
            stars
        }

        await dispatch(reviewActions.thunkEditReview(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
              if (errors.length > 0) {
                setDisableSubmit(true)
              } else setShowModal(false)
            }

    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)


    return (

        <div className='host-form-container'>
            <ul className='host-form-errors'>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        <h1 className='edit-listing-form'>Edit Review</h1>
            <form onSubmit={onSubmit}>
                <textarea required className='Review (minimum 10 characters)' placeholder="Description" value={content} onChange={contentChange} ></textarea>
                <input type="number" maxLength={1} required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                <button type="submit" disabled={disableSubmit}>Submit Changes</button>
            </form>
        </div>
    )
}
