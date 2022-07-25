import { useSelector } from "react-redux";


export default function MangageListings () {
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots.list)
    console.log("all spots", allSpots)
    let userSpots

    if(sessionUser) {
        userSpots = allSpots.filter(el => el.ownerId === sessionUser.id)
    }

    console.log(userSpots)

    return (
        <>
        <h1>My Listings</h1>
        {userSpots.map(spot => (
            <div>
                <h1>Name: {spot.name}</h1>
                <p>Location: {spot.city}, {spot.state}</p>
                <p>Price: {spot.price}</p>
                <p>Owner: {spot.ownerId} </p>
            </div>
        ))}
        </>
    )
}
