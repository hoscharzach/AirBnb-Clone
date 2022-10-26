import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link, useLocation } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import * as sessionActions from '../../store/session'
import mainLogo from '../../assets/images/icons/svgexport-1.svg'
import eldenB from '../../assets/images/icons/eldenb.svg'
import rings from '../../assets/images/icons/rings.svg'
import EldenBLogo from "./EldenBLogo"


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
    <div style={topBarStyles} className="w-full h-24 flex justify-center align-middle border-b sticky top-0 bg-white z-10">
      <div style={navStyles} className="w-4/5 flex justify-between items-center relative">
        <div className="">
          <NavLink exact to="/">
            {/* <EldenBLogo /> */}
            <img className="header-icon" src={mainLogo} alt=" "></img>
          </NavLink>
        </div>

        <div className="flex items-center relative ">
          {sessionUser ? null : <button className="airbnb-button p-2" onClick={demoLogin}>Demo User</button>}
          <ProfileButton user={sessionUser} />
        </div>

      </div>
    </div>

  );
}

export default Navigation;
