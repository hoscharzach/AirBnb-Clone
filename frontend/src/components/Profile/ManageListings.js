import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


export default function MangageListings () {
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots.list)
    console.log("all spots", allSpots)
    let userSpots

    if(sessionUser) {
        userSpots = allSpots.filter(el => el.ownerId === sessionUser.id)
    }

    console.log(userSpots)

    if(!sessionUser) {
        return (
            <Redirect to="/"></Redirect>
        )
    }

    return (
        <>
        <div className="my-listings-container">
        <h1>My Listings</h1>
            <ol>
                {userSpots.map((spot, i) => (
                <li key={i}>
                    <h2>Name: {spot.name}</h2>
                    <p>Location: {spot.city}, {spot.state}</p>
                    <p>Price: {spot.price}</p>
                    <p>Owner: {spot.ownerId} </p>
                </li>
                ))}
            </ol>
        </div>
        </>
    )
}
