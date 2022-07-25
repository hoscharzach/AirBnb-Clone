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



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(spotActions.thunkLoadAllSpots())
  },[dispatch])

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
        </Switch>
      )}
    </>
  );
}

export default App;


// function App() {
//   const dispatch = useDispatch()


//   useEffect(() => {
//     dispatch(sessionActions.thunkRestoreSession())
//   }, [dispatch])

//   return (
//     <>
//     <Navigation />
//     <Switch>
//       <Route exact path="/">
//         <h1>Home Page</h1>
//       </Route>
//       <Route path="/login">
//         <LoginFormPage />
//       </Route>
//       <Route path="/signup">
//         <SignupForm />
//       </Route>
//     </Switch>
//     </>
//   );
// }

// export default App;
