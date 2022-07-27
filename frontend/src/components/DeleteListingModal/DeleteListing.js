import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spots'


export default function DeleteListing ({spot, setShowModal}) {
    const dispatch = useDispatch()

    function onClickYes (e) {
        window.alert("Successfully deleted")
        setShowModal(false)
    }

    function onClickNo (e) {
        setShowModal(false)
    }

    return (
        <>
        <h2>Are you sure you want to remove this listing?</h2>
        <button onClick={onClickYes}>Yes</button><button onClick={onClickNo}>No</button>
        </>
    )
}
