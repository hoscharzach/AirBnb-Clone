import { thunkLogin, thunkLogout } from './store/session'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  return (
    // <h1>Hello from App</h1>
    <div>
    <button onClick={(e) => dispatch(thunkLogin({ "credential": "Demo-lition", "password": "password" }))}>LOGIN</button>
    <br></br>
    <button onClick={(e) => dispatch(thunkLogout())}>LOGOUT</button>
    </div>
  );
}

export default App;
