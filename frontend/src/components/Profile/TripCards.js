import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteBooking } from "../../store/session";
import { convertISODateToRange } from "../../utils/functions";


export default function TripCards({ trip }) {

    const dispatch = useDispatch()
    const [confirm, setConfirm] = useState(false)

    function cancelBooking() {
        dispatch(thunkDeleteBooking(trip.id))
    }

    console.log(trip)
    return (
        <>
            {/* Card wrapper */}
            {
                trip &&
                <div className="w-full flex flex-row border p-2 rounded-xl max-w-[600px] shadow-md">
                    {/* Left section */}
                    <div className="flex flex-col w-2/4 justify-center items-center">
                        <div className="font-semibold text-md text-center whitespace-nowrap text-ellipsis overflow-hidden">{trip.Spot.name}</div>
                        <div className="w-full text-sm text-center mt-1 whitespace-nowrap text-ellipsis overflow-hidden">{trip.Spot.shortDescription}</div>
                        <hr className="w-3/4 my-3"></hr>
                        <div className="text-xs">{trip.Spot.country} </div>
                        <div className="text-xs">{trip.Spot.realm} </div>
                        <hr className="my-3 w-1/2" ></hr>
                        <div className="text-xs">{`${convertISODateToRange(trip.startDate, trip.endDate)}`}</div>
                        <div className="flex flex-row gap-2 mt-5 w-full justify-center">
                            {!confirm && <button onClick={() => setConfirm(true)} className="active:translate-x-0.5 active:translate-y-0.5 bg-red-600 p-2 rounded-lg text-sm text-white">Cancel</button>}
                            {confirm &&
                                <div className="flex flex-col items-center w-full">
                                    <div className="text-xs mb-2">Are you sure?</div>
                                    <div className="flex justify-center gap-2">

                                        <button onClick={cancelBooking} className="active:translate-x-0.5 active:translate-y-0.5 bg-red-600 p-2 rounded-lg text-sm text-white px-4">Yes</button>
                                        <button onClick={() => setConfirm(false)} className="active:translate-x-0.5 active:translate-y-0.5 bg-slate-500 p-2 rounded-lg text-sm text-white px-4">No</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* Right section */}
                    <div className="w-2/4">
                        <img className="object-cover aspect-square" src={trip.Spot.Images[0].imageUrl}></img>
                    </div>
                </div>
            }
        </>
    )
}
