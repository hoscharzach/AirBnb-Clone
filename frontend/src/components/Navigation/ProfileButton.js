import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import userIcon from '../../assets/images/icons/svgexport-7.svg'
import hamburgerIcon from '../../assets/images/icons/svgexport-6.svg'
import LoginFormModal from '../LoginFormModal'
import rings from '../../assets/images/icons/rings.svg'


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
        <div className=''>{user.email}</div>
        <hr style={{ padding: 0 }} className='mx-2'></hr>
        {/* <button className='flex items-start' onClick={() => history.push('/my-profile')} >My Listings</button> */}
        <button className='flex justify-start' onClick={() => history.push('/trips')} >Upcoming Trips</button>
        <button className='flex justify-start' onClick={() => history.push('/create-listing')} >Create Listing</button>
        <button className='flex justify-start' onClick={logout}>Log out</button>
      </>
    )
  }

  if (!user) {
    dropdownItems = (
      <>
        <LoginFormModal />
        <button className='flex justify-start' onClick={() => history.push('/signup')} >Sign up</button>
      </>
    )
  }

  return (
    <div className='flex relative ml-4'>
      <button className='rounded-3xl p-4 flex justify-between items-center w-[77px] h-[40px] border hover:shadow-lg' onClick={openMenu}>
        <img className='h-[16px] w-[16px]' src={hamburgerIcon} alt="" />
        <img className='h-[30px] w-[30px] ml-1' src={userIcon} alt="" />
      </button>

      {showMenu && (
        <div className='
        flex flex-col
        absolute top-[42px] right-[8px] w-[220px]
        bg-slate-50
        rounded-md
        border
        shadow-md
        child:p-3 child:transition
        [&>button:hover]:bg-slate-200 duration-500'
        >
          {dropdownItems}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
