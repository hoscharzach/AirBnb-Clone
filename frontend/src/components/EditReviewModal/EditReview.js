import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as reviewActions from '../../store/reviews'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

export default function EditReview ({review, setShowModal}) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(review?.stars || '')
    const [content, setContent] = useState(review?.content || '')
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = []
        const validStars = ['1', '2', '3', '4', '5']
            if (content.length < 10) errors.push('Review must be at least 10 characters')
            if (!validStars.includes(stars)) errors.push('Rating must be a whole number')
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

        if (errors.length === 0) {
            setShowModal(false)

        }
    }

    const clickX = (e) => {
        setShowModal(false)
      }


    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)


    return (
        <>
            <div className="close-out-button" onClick={clickX}>
                <img className="x" src={x} alt=""></img>
            </div>

            <div className="entire-modal-wrapper">

                <div className="modal-header">
                    <div className="header-text">
                        Edit Review
                    </div>
                </div>
                <div className='modal-body-wrapper'>

                    <div className='host-form-container'>
                        <ul className='host-form-errors'>
                            {hasSubmitted && errors.map((error, i) => (
                                <li key={i}>{error}</li>
                                ))}
                        </ul>
                        <form className="create-listing-form" onSubmit={onSubmit}>
                            <input id='create-listing-top-input' required placeholder="Description" value={content} onChange={contentChange} ></input>
                            <input id='create-listing-bottom-input' type="number" maxLength="1" required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                            <button id='signup-submit-button' type="submit" disabled={disableSubmit}>Submit Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
