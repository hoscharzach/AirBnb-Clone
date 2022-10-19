import { convertISODateToRange } from "../../utils/functions";

export default function TripCards({ trip, variant }) {


    return (
        <>
            {/* Card wrapper */}
            <div className="w-full flex flex-row border p-2 rounded-xl">
                {/* Left section */}
                <div className="flex flex-col w-2/4 justify-center items-center">
                    <div className="font-semibold text-xl text-center whitespace-nowrap text-ellipsis overflow-hidden">{trip.Spot.name}</div>
                    <div className="w-full text-sm text-center mt-1 max-h-4 whitespace-nowrap text-ellipsis overflow-hidden">{trip.Spot.description}</div>
                    <hr className="w-3/4 my-3"></hr>
                    <div className="text-xs">{trip.Spot.city}, {trip.Spot.state} </div>
                    <div className="text-xs">{trip.Spot.country} </div>
                    <hr className="my-3 w-1/2" ></hr>
                    <div className="text-xs">{`${convertISODateToRange(trip.startDate, trip.endDate)}`}</div>
                    <div className="flex flex-row gap-2 mt-5 w-full justify-center">
                        <button className="bg-red-600 p-2 rounded-lg text-sm text-white">Cancel</button>
                    </div>
                </div>
                {/* Right section */}
                <div className="w-2/4">
                    <img className="object-cover aspect-square" src={trip.Spot.previewImage}></img>
                </div>
            </div>
        </>
    )
}
