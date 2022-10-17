import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'
import * as spotActions from './store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './index.css';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import SpotDisplay from './components/SpotDisplay'
import SpotIndex from './components/SpotIndex';
import MangageListings from './components/Profile/ProfilePage';
import * as reviewActions from './store/reviews'
import HostForm from './components/NewSpotForm'
import { UserReservations } from './components/Profile/UserReservations';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession())
      .then(a => dispatch(spotActions.thunkLoadAllSpots()))
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className='w-full min-h-[100vh] flex justify-center mt-6 '>
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
      <div className='w-full h-20 sticky bottom-0 mt-7 border-y bg-white flex items-center justify-center'>Footer</div>
    </>
  );
}

export default App;
