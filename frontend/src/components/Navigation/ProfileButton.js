import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import userIcon from '../../assets/images/icons/svgexport-7.svg'
import hamburgerIcon from '../../assets/images/icons/svgexport-6.svg'
import LoginFormModal from '../LoginFormModal'


function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user)
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
      const modal = document.getElementById('modal-background')
      if (modal) return

      if (e.target.id === 'login-form-modal' ||
        e.target.id === 'signup-form-modal' ||
        e.target.id === 'modal-background') return

      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
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
    <div className='flex'>
      <div className="flex" onClick={openMenu}>
        <button className='flex items-center'>
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
