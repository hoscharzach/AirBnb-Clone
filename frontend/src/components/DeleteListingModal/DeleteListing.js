import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spots'
import { useState } from "react"
import { useHistory } from "react-router-dom"


export default function DeleteListing ({spot, setShowModal, redirect}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])

    async function onClickYes (e) {
        e.preventDefault()
        await dispatch(spotActions.thunkDeleteSpot(spot.id))

            window.alert("Listing successfully deleted")
            history.push(`/`)

    }

    function onClickNo (e) {
        setShowModal(false)
    }

    return (
        <>
        <ul>
        {errors.map((error, i) => (
            <li key={i}>{error} </li>
            ))}
        </ul>

        <h2>Are you sure you want to remove this listing?</h2>
        <button onClick={onClickYes}>Yes</button><button onClick={onClickNo}>No</button>
        </>
    )
}
