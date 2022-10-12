import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import './navigation.css'
import * as sessionActions from '../../store/session'
import mainLogo from '../../assets/images/icons/svgexport-1.svg'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch()

  const demoLogin = () => {
    dispatch(sessionActions.thunkLogin({
      credential: 'Demo-lition',
      password: 'password'
    }))

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
    <div className="w-full h-24 flex justify-center align-middle border-b sticky top-0 bg-white ">
      <div className="w-4/5 flex justify-between items-center">
        <div className="">
          <NavLink exact to="/">
            <img className="header-icon" src={mainLogo} alt=" "></img>
          </NavLink>
        </div>

        <div className="flex items-center ">
          {isLoaded && sessionLinks}
        </div>

      </div>
    </div>

  );
}

export default Navigation;
