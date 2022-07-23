import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"


export default function Navigation () {
    const sessionUser = useSelector(state => state.session.user)

        return (
            <nav>
                <NavLink to="/">Home</NavLink>
                {sessionUser && <NavLink to="/profile"><ProfileButton /></NavLink>}
                {!sessionUser && <NavLink to="/login">Login</NavLink>}
                {!sessionUser && <NavLink to="/signup">Signup</NavLink>}
            </nav>

        )

}
