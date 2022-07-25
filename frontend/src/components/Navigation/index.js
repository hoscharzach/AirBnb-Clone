import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
        <NavLink to="/host-form">Host</NavLink>
        <ProfileButton user={sessionUser} />
        </>
      );
    } else {
      sessionLinks = (
        <>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      );
    }

    return (
      <div className="header-container">
        <NavLink exact to="/"><img className="header-icon" src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo-500x181.png" alt=" "></img></NavLink>

      <div></div>
      <div className="home-nav-links">
        {isLoaded && sessionLinks}
      </div>
      </div>

    );
  }

  export default Navigation;

// export default function Navigation () {
//     const sessionUser = useSelector(state => state.session.user)
//     const dispatch = useDispatch()

//         return (
//             <nav>
//                 <NavLink to="/">Home</NavLink>
//                 {sessionUser && <ProfileButton user={sessionUser}/>}
//                 {!sessionUser && <NavLink to="/login">Login</NavLink>}
//                 {!sessionUser && <NavLink to="/signup">Signup</NavLink>}
//             </nav>
//         )

// }
