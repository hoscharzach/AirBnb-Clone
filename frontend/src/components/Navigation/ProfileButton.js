import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import userIcon from '../../assets/images/icons/svgexport-7.svg'
import hamburgerIcon from '../../assets/images/icons/svgexport-6.svg'
import LoginFormModal from '../LoginFormModal'


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

      const closeMenu = (e) => {
        console.log(e.target.id)
        const modal = document.getElementById('modal-background')
        if( modal) return

        if (e.target.id === 'login-form-modal'||
            e.target.id === 'signup-form-modal' ||
            e.target.id === 'modal-background') return

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

    let dropdownItems
    if (user) {
      dropdownItems = (
        <>
        <div className='menu-item'>{user.username}</div>
        <div className='menu-item menu-item-hover' onClick={() => history.push('/my-profile')} >My Profile</div>
        <div className='menu-item menu-item-hover' onClick={() => history.push('/create-listing')} >Create Listing</div>
        <div className='menu-item menu-item-hover' onClick={logout}>Log out</div>
        </>
      )
    }

    if (!user) {
      dropdownItems = (
        <>
        <LoginFormModal />
        <div className='menu-item menu-item-hover' onClick={() => history.push('/signup')} >Sign up</div>
        </>
      )
    }

    return (
      <div id="menu-container">
        <div className="profile-icons-container" onClick={openMenu}>
          <button className="profile-icons">
            <img className='hamburger-icon' src={hamburgerIcon} alt="" />
            <img className='user-icon' src={userIcon} alt="" />
          </button>
        </div>
        {showMenu && (
          <div id="profile-dropdown-wrapper">
            {dropdownItems}
          </div>
        )}
      </div>
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
