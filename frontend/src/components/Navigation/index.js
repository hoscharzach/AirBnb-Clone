import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import LoginFormModal from '../LoginFormModal'


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    console.log("navigation user", sessionUser)

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
        <NavLink className="text-link" to="/host-form">Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
        </>
      );
    } else {
      sessionLinks = (
        <>
          <LoginFormModal />
          <NavLink className="text-link" to="/signup">Sign Up</NavLink>
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
