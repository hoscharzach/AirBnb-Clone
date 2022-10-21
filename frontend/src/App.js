import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'
import * as spotActions from './store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './index.css';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import SpotDisplay from './components/SpotDisplay'
import SpotIndex from './components/SpotIndex';
import MangageListings from './components/Profile/ProfilePage';
import HostForm from './components/NewSpotForm'
import { UserReservations } from './components/Profile/UserReservations';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation()

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession())
      .then(a => dispatch(spotActions.thunkLoadAllSpots()))
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className='w-full min-h-screen h-full flex justify-center'>
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SpotIndex />
            </Route>
            <Route path="/spots/:spotId">
              <SpotDisplay />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <Route path="/my-profile">
              <MangageListings />
            </Route>
            <Route path="/create-listing">
              <HostForm />
            </Route>
            <Route>
              <UserReservations />
            </Route>
            <Route>
              <h1>404 Not Found</h1>
            </Route>
          </Switch>
        )}
      </div>
      <div className={location.pathname.includes('/create-listing') ? 'hidden' : 'w-full h-20 sticky bottom-0 border-y bg-white flex items-center justify-center gap-4'}>
        <span>Made by Zach Hoschar:</span>
        <span className='underline  '><a className='text-blue-400' target="_blank" rel="noreferrer" href='https://github.com/hoscharzach/AirBnb-Clone'>Github Repo</a></span>
        <span className='underline '><a className='text-blue-400' target="_blank" rel="noreferrer" href='https://zachhoschar.com/'>Portfolio</a></span>
      </div>
    </>
  );
}

export default App;
