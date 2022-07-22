import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session'
import { useDispatch } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import './index.css';
import SignupForm from './components/SignupForm';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreSession())
  }, [dispatch])

  return (
    <>
    <nav>
      <NavLink to="/login">Login |</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </nav>
    <Switch>
      <Route exact path="/">
        <h1>Hello from home</h1>
        <button onClick={async (e) => dispatch(sessionActions.thunkLogout())}>Logout</button>

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
