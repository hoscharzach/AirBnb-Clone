import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import './navigation.css'
import * as sessionActions from '../../store/session'
import userIcon from '../../assets/images/icons/svgexport-7.svg'
import hamburgerIcon from '../../assets/images/icons/svgexport-6.svg'


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      history.push('/')

    };

    return (
      <>
        <div className="profile-icons-container" onClick={openMenu}>
          <div className="profile-icons">
            <img className='hamburger-icon' src={hamburgerIcon} alt="" />
            <img className='user-icon' src={userIcon} alt="" />
          </div>
        </div>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li><Link to="/my-profile">My Profile</Link></li>
            <li><button onClick={logout}>Log Out</button></li>
          </ul>
        )}
      </>
    );
  }

  export default ProfileButton;

// export default function ProfileButton ({user}) {
//     const dispatch = useDispatch()
//     const [showMenu, setShowMenu] = useState(false)

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = () => {
//           setShowMenu(false);
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//       }, [showMenu]);

//     return (
//         <div className="profile-button">
//             <i className="fas fa-user-circle" onClick={(e) => {
//                 showMenu === false ? setShowMenu(true) : setShowMenu(false)
//             }}></i>
//             {showMenu && <div>
//                 <p>Dropdown Menu</p>
//                 <ul>
//                     <li>Username: {user.username}</li>
//                     <li>Email: {user.email}</li>
//                     {/* {user && <button onClick={async (e) => dispatch(sessionActions.thunkLogout())}>Logout</button>} */}
//                 </ul>
//                 </div>}
//         </div>
//     )
// }
