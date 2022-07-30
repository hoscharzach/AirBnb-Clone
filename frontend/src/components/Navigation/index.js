import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import * as sessionActions from '../../store/session'
import AddListingModal from "../AddListingModal"
import mainLogo from '../../assets/images/icons/svgexport-1.svg'


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()

    const demoLogin = () => {
      dispatch(sessionActions.thunkLogin({
        credential: 'Demo-lition',
        password: 'password'
      }))
      .then(() => {
        history.push('/')
      })
    }

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
          <Link to="/create-listing">Become a Host</Link>
          <ProfileButton user={sessionUser} />
        </>
      );
    }
    else {
      sessionLinks = (
        <>
          <button id="demo-user-button" onClick={demoLogin}>Demouser</button>
          <ProfileButton user={sessionUser} />
        </>
      );
    }

    return (
      <div className="entire-header">

        <div className="header-container">

          <div className="logo-container">
            <NavLink exact to="/">
              <img className="header-icon" src={mainLogo} alt=" "></img>
            </NavLink>
          </div>

          {/* <div className="middle-div"></div> */}

          <div className="home-nav-links">
            {isLoaded && sessionLinks}
          </div>

        </div>
      </div>

    );
  }

  export default Navigation;
