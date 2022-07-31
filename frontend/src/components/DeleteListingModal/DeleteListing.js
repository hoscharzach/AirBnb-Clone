import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spots'
import { useState } from "react"
import { useHistory } from "react-router-dom"
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'


export default function DeleteListing ({spot, setShowModal, redirect}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])

    async function onClickYes (e) {
        e.preventDefault()
        await dispatch(spotActions.thunkDeleteSpot(spot.id))
            window.alert("Listing successfully deleted")

            if (redirect === '/my-profile') {
                setShowModal(false)
            } else history.push('/')


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

{/*
            <ul>
            {errors.map((error, i) => (
                <li key={i}>{error} </li>
                ))}
            </ul> */}

            <h2 class>Are you sure you want to delete this listing?</h2>
            <div className="yes-or-no-buttons-container">
                <button className="edit-review-modal-button" onClick={onClickYes}>Confirm</button>
                <button className="edit-review-modal-button" onClick={onClickNo}>Cancel</button>
            </div>
                </div>
        </div>
        </>
    )
}
