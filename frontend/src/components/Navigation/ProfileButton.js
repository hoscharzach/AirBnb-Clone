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
        <div>{user.username}</div>
        <div className=''>{user.email}</div>
        <hr style={{ padding: 0 }} className='my-2'></hr>
        <button className='flex items-start' onClick={() => history.push('/my-profile')} >My Profile</button>
        <button className='flex items-start' onClick={() => history.push('/create-listing')} >Create Listing</button>
        <button className='flex items-start' onClick={logout}>Log out</button>
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
    <div className='flex relative ml-4'>
      <button className='rounded-3xl p-4 flex justify-between items-center w-[80px] h-[40px] border hover:shadow-md' onClick={openMenu}>
        <img className='h-[16px] w-[16px]' src={hamburgerIcon} alt="" />
        <img className='h-[32px] w-[32px]' src={userIcon} alt="" />
      </button>

      {showMenu && (
        <div className='
        flex flex-col
        absolute top-[42px] right-[8px] w-[220px]
        bg-slate-50
        rounded-md
        border
        shadow-md
        child:p-3 [&>button:hover]:bg-slate-200'>
          {dropdownItems}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
