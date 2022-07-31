import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as reviewActions from '../../store/reviews'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

export default function AddReview ({user, spot, setShowModal }) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState(5)
    const [content, setContent] = useState('')
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const clickX = (e) => {
        setShowModal(false)
      }

    useEffect(() => {
        console.log(content)
        const errors = []
        if (stars < 1 || stars > 5) errors.push('Stars must be between 1 and 5')
        if (content.length < 10) errors.push('Review must be at least 10 characters')

        setErrors(errors)

        if (errors.length > 0 && hasSubmitted === true) {
            setDisableSubmit(true)
        } else setDisableSubmit(false)
    },[stars, content])

    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (errors.length === 0) {

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
            if (errors.length === 0) setShowModal(false)
        }

    }

    const contentChange = (e) => setContent(e.target.value)
    const starsChange = (e) => setStars(e.target.value)

    return (
        <>
        <div className="close-out-button" onClick={clickX}>
          <img className="x" src={x} alt=""></img>
        </div>
        <div className='entire-modal-wrapper'>

            <div className='modal-header'>
                <h2 className='header-text'>
                    Add Review
                </h2>
            </div>
            <div className='modal-body-wrapper'>

                <div className='add-review-container'>
                    <ul className='add-review-validation-errors'>
                        {hasSubmitted && errors.map((error, i) => (
                            <li key={i}>{error}</li>
                            ))}
                    </ul>
                    <form className='create-listing-form'>

                        <input id='create-listing-top-input' type="text" required className='top-input' placeholder="Review (minimum 10 characters)" value={content} onChange={contentChange} ></input>
                        <input id='create-listing-bottom-input' type="number" min="1" max="5" className='bottom-input' maxLength="1" required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                        <button type="submit" id='submit-review-button' disabled={disableSubmit} onClick={onSubmit} >Leave Review</button>
                    </form>

                </div>
            </div>

        </div>
        </>
    )
}
