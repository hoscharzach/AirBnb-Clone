import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spots'
import { useHistory } from "react-router-dom"
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'


export default function DeleteListing({ spot, setShowModal, redirect }) {
    const dispatch = useDispatch()
    const history = useHistory()

    async function onClickYes(e) {
        e.preventDefault()
        await dispatch(spotActions.thunkDeleteSpot(spot.id))

        if (redirect === '/my-profile') {
            setShowModal(false)
        } else history.push('/')


    }

    function close(e) {
        setShowModal(false)
    }


    return (
        <>
            <div className="close-out-button" onClick={close}>
                <img className="x" src={x} alt=""></img>
            </div>

            <div className="entire-modal-wrapper">
                <div className="modal-header">
                    <div className="header-text">
                        Delete Listing
                    </div>
                </div>
                <div className='modal-body-wrapper'>

                    <h2>Are you sure you want to delete this listing?</h2>
                    <div className="yes-or-no-buttons-container">
                        <button className="edit-review-modal-button" onClick={onClickYes}>Confirm</button>
                        <button className="edit-review-modal-button" onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
