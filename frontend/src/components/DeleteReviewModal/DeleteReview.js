import { useDispatch } from "react-redux"
import * as reviewActions from '../../store/reviews'
import { useState } from "react"


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
            window.alert("Review successfully deleted")
            setShowModal(false)
        }
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

        <h2>Are you sure you want to remove this review?</h2>
        <button onClick={onClickYes}>Yes</button><button onClick={onClickNo}>No</button>
        </>
    )
}
