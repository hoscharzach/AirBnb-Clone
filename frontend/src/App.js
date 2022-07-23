import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './index.css';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession())
  }, [dispatch])

  return (
    <>
    <Navigation />
    <Switch>
      <Route exact path="/">
        <h1>Home Page</h1>
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
    </Switch>
    </>
  );
}

export default App;
