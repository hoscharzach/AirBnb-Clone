import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link, useLocation } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import * as sessionActions from '../../store/session'
import mainLogo from '../../assets/images/icons/svgexport-1.svg'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch()

  const location = useLocation()
  const demoLogin = () => {
    dispatch(sessionActions.thunkLogin({
      credential: 'Demo-lition',
      password: 'password'
    }))

  }

  let navStyles
  let topBarStyles

  if (location.pathname === '/') {
    navStyles = {
      width: '92%',
    }
  } else if (location.pathname.includes('/create-listing')) {
    topBarStyles = {
      display: 'none'
    }
  } else {
    navStyles = {
      width: '80%',
      maxWidth: '1200px'
    }
  }

  if (!isLoaded) return (null)

  return (
    <div style={topBarStyles} className="w-full h-24 flex justify-center align-middle border-b sticky top-0 bg-white ">
      <div style={navStyles} className="w-4/5 flex justify-between items-center">
        <div className="">
          <NavLink exact to="/">
            <img className="header-icon" src={mainLogo} alt=" "></img>
          </NavLink>
        </div>

        <div className="flex items-center ">
          {sessionUser ? null : <button id="demo-user-button" onClick={demoLogin}>Demo User</button>}
          <ProfileButton user={sessionUser} />
        </div>

      </div>
    </div>

  );
}

export default Navigation;
