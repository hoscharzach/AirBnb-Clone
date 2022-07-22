import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import { logout } from ''./store/session''
import { useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()


  return (
    <>
    <Switch>
      <Route exact path="/">
        <>
        <h1>Hello from home</h1>
        <Link to="/login"><button>Login</button></Link><br></br>
        <button onClick={(e) => dispatch(logout)}>Logout</button>
        </>
      </Route>
      <Route path="/login">
    <LoginFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
