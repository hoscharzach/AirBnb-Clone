import { thunkLogin, thunkLogout } from './store/session'
import { useDispatch } from 'react-redux'
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/">
        <h1>Hello from home</h1>
      </Route>
      <Route path="/login">
    <LoginFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
