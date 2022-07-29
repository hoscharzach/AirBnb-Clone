import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import LoginFormModal from '../LoginFormModal'
import AddListingModal from "../AddListingModal"
import mainLogo from '../../assets/images/icons/svgexport-1.svg'


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
        <AddListingModal />
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
      <div className="entire-header">
        <div className="header-container">
          <div className="logo-container">
            <NavLink exact to="/"><img className="header-icon" src={mainLogo} alt=" "></img></NavLink>
          </div>
          <div className="middle-div">
          </div>
          <div className="home-nav-links">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>

    );
  }

  export default Navigation;
