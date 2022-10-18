import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import TripCards from "./TripCards"


export function UserReservations() {

    const sessionUser = useSelector(state => state.session.user)
    const today = new Date()




    if (!sessionUser) return <Redirect to={'/'} />

    return (
        <>
            {/* entire body wrapper */}
            <div className="flex flex-col w-4/5 max-w-[1200px]">
                {/* Title */}
                <div className="text-3xl my-4">Upcoming Trips</div>
                {/* Trip-cards container */}
                <div className="w-full flex flex-col items-center md:grid md:grid-cols-trips gap-3 auto-rows-index">
                    {/* Trip cards */}
                    {sessionUser && sessionUser.Bookings.map(trip => (
                        // only render trip cards if the trip is in the future
                        new Date(trip.startDate) > today ? <TripCards key={trip.id} trip={trip} /> : null
                    ))}
                </div>
            </div>
        </>
    )
}
