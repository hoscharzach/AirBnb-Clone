import { useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import TripCards from "./TripCards"


export function UserReservations() {

    const sessionUser = useSelector(state => state.session.user)
    const today = new Date()


    // only render trips that are past today
    const futureTrips = sessionUser?.Bookings.filter(trip => new Date(trip.startDate) > today)
        .map(trip => <TripCards key={trip.id} trip={trip} />)


    if (!sessionUser) return <Redirect to={'/'} />

    // if no trips are in the future
    if (futureTrips.length === 0) return (
        <div className="text-xl flex max-h-[80vh] items-center">You have no upcoming trips <Link className="underline text-fuchsia-700" to='/'>,  find a place to stay. </Link></div>
    )

    return (
        <>
            {/* entire body wrapper */}
            <div className="flex flex-col w-4/5 max-w-[1200px] mb-24">
                {/* Title */}
                <div className="text-3xl my-4">Upcoming Trips</div>
                {/* Trip-cards container */}
                <div className="w-full flex flex-col items-center md:grid md:grid-cols-trips gap-3 auto-rows-trip-cards">
                    {/* Trip cards */}
                    {sessionUser && futureTrips}
                </div>
            </div>
        </>
    )
}
