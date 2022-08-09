import { useDispatch } from 'react-redux'
import { useState } from 'react'
import * as reviewActions from '../../store/reviews'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

export default function AddReview ({user, spot, setShowModal }) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [stars, setStars] = useState('')
    const [content, setContent] = useState('')
    // const [disableSubmit, setDisableSubmit] = useState(false)
    // const [hasSubmitted, setHasSubmitted] = useState(false)

    const clickX = (e) => {
        setShowModal(false)
      }

    // useEffect(() => {
    //     const errors = []
    //     const validRatings = ['1','2','3','4','5']
    //     if (!validRatings.includes(stars)) errors.push('Rating must be whole number between 1 and 5')
    //     if (content.length < 10) errors.push('Review must be at least 10 characters')

    //     setErrors(errors)

    //     if (errors.length > 0 && hasSubmitted === true) {
    //         setDisableSubmit(true)
    //     } else setDisableSubmit(false)
    // },[stars, content])

    const onSubmit = async (e) => {
        e.preventDefault()

            const payload = {
                content,
                stars,
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
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                            ))}
                    </ul>
                    <form className='create-listing-form'>

                        <input id='create-listing-top-input' type="text" required className='top-input' placeholder="Review (minimum 10 characters)" value={content} onChange={contentChange} ></input>
                        <input id='create-listing-bottom-input'  type="number" className='bottom-input' required placeholder="Rating (1-5)" value={stars} onChange={starsChange}></input>
                        <button type="submit" id='submit-review-button' onClick={onSubmit} >Leave Review</button>
                    </form>

                </div>
            </div>

        </div>
        </>
    )
}
