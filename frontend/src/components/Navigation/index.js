import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import * as sessionActions from '../../store/session'


export default function Navigation () {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)

        return (
            <nav>
                <NavLink to="/">Home</NavLink>
                {sessionUser && <ProfileButton user={sessionUser}showMenu={showMenu} setShowMenu={setShowMenu}/>}
                {sessionUser && <button onClick={async (e) => dispatch(sessionActions.thunkLogout())}>Logout</button>}
                {!sessionUser && <NavLink to="/login">Login</NavLink>}
                {!sessionUser && <NavLink to="/signup">Signup</NavLink>}
            </nav>
        )

}
