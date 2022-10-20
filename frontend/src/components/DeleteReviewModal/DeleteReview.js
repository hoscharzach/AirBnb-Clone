import { useDispatch } from "react-redux"
import * as reviewActions from '../../store/spots'
import { useState } from "react"
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'


export default function DeleteReview({ setShowModal, review }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    async function onClickYes(e) {
        e.preventDefault()
        const res = await dispatch(reviewActions.thunkDeleteReview(review.id, review.spotId))
            .catch(
                async (res) => {
                    console.log(res)
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );

        if (res && errors.length === 0) {
            setShowModal(false)
        }
    }

    return (
        <>
            <div className=' max-w-[400px] flex flex-col'>
                {/* header */}
                <div className='h-[50px] flex items-center border-b px-5'>
                    <button className='w-max hover:bg-slate-300 p-2 rounded-full' onClick={() => setShowModal(false)} ><img className="h-[14px] w-[14px]" src={x} alt=""></img></button>
                    <div className='flex justify-center w-full'>

                        <h2 className='text-lg relative right-4'>
                            Delete Review
                        </h2>
                    </div>
                </div>
                <div className='p-2'>

                    <div className='flex flex-col items-center'>
                        <h2 className="text-lg">Are you sure you want to delete this review?</h2>

                        <div className="flex gap-2 my-4">
                            <button className="p-4 bg-red-600 text-white rounded-lg active:translate-x-0.5 active:translate-y-0.5" onClick={onClickYes}>Confirm</button>
                            <button className="p-4 bg-slate-400 text-white rounded-lg active:translate-x-0.5 active:translate-y-0.5" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}
