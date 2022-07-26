import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'
import * as spotActions from './store/spots'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './index.css';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import SpotDisplay from './components/SpotDisplay'
import SpotIndex from './components/SpotIndex';
import HostForm from './components/NewSpotForm';
import MangageListings from './components/Profile/ManageListings';



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(spotActions.thunkLoadAllSpots())
  },[dispatch])

  // useEffect(() => {
  //   dispatch(spotActions.thunkLoadAllReviews())
  // }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
          <Route path="/host-form">
            <HostForm />
          </Route>
          <Route path="/manage-my-listings">
            <MangageListings />
          </Route>
          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
