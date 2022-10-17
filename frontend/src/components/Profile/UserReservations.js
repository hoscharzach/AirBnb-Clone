import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"


export function UserReservations() {
    const sessionUser = useSelector(state => state.session.user)




    if (!sessionUser) return <Redirect to={'/'} />

    return (
        <h1>Hello from reservations</h1>
    )
}
