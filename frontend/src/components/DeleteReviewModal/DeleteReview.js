import { useDispatch } from "react-redux"
import * as reviewActions from '../../store/reviews'
import { useState } from "react"
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'


export default function DeleteReview ({setShowModal, review}) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    async function onClickYes (e) {
        e.preventDefault()
        const res = await dispatch(reviewActions.thunkDeleteReview(review)).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );

        if (res && errors.length === 0) {
            // window.alert("Review successfully deleted")
            setShowModal(false)
        }
    }
    function onClickNo (e) {
        setShowModal(false)
    }
    const clickX = (e) => {
        setShowModal(false)
      }

    return (
        <>
        <div className="close-out-button" onClick={clickX}>
                <img className="x" src={x} alt=""></img>
        </div>

        <div className="entire-modal-wrapper">
                <div className="modal-header">
                    <div className="header-text">
                        Delete Listing
                    </div>
                </div>
            <div className='modal-body-wrapper'>

        <ul>
        {errors.map((error, i) => (
            <li key={i}>{error} </li>
            ))}
        </ul>

        <h2>Are you sure you want to delete this review?</h2>
        <div className="yes-or-no-buttons-container">
            <button className="edit-review-modal-button" onClick={onClickYes}>Yes</button>
            <button className="edit-review-modal-button" onClick={onClickNo}>No</button>
        </div>
            </div>
        </div>
        </>
    )
}
