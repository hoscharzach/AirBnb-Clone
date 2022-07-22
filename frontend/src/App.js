import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import * as sessionActions from './store/session'
import { useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  return (
    <>
    <Switch>
      <Route exact path="/">

        <h1>Hello from home</h1>
        <Link to="/login"><button>Login</button></Link><br></br>
        <button onClick={async (e) => dispatch(sessionActions.thunkLogout())}>Logout</button>

      </Route>
      <Route path="/login">
    <LoginFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
