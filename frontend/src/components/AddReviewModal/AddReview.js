import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as reviewActions from '../../store/reviews'

export default function AddReview ({ spot, setShowModal }) {
    const dispatch = useDispatch()

    const [validationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(5)
    const [content, setContent] = useState('')
    const [disableSubmit, setDisableSubmit] = useState(false)

    useEffect(() => {
        const formErrors = []
        if (stars < 1 || stars > 5) formErrors.push('Stars must be between 1 and 5')
        if (content.length < 10) formErrors.push('Review must be at least 10 characters')
        setValidationErrors(formErrors)
        setDisableSubmit(validationErrors.length > 0)
    },[stars, content, validationErrors.length])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])


        const payload = {
            content,
            stars,
            spotId: spot.id
        }

        await dispatch(reviewActions.thunkCreateReview(payload))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                })

        if (errors.length > 0) {
            setDisableSubmit(true)
        } else {
            setShowModal(false)
        }

    }

    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)

    return (

        <div className='add-review-container'>
            <ul className='add-review-errors'>
                {validationErrors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
            <ul className='add-review-validation-errors'>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        <h1 className='add-review-title'>Add Review</h1>
            <form onSubmit={onSubmit}>
                <textarea required className='content-field' placeholder="Review (minimum 10 characters)" value={content} onChange={contentChange} ></textarea>
                <input type="number" maxLength={1} required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                <button type="submit" disabled={disableSubmit}>Leave Review</button>
            </form>
        </div>
    )
}
