import { thunkLogin } from "../../store/session";
import '../../components/LoginFormPage/loginform.css'
import { useState} from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginFormPage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([])
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')

    if (user) {
        return (
            <Redirect to="/" />
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])

        const payload = {
            credential,
            password
        }

        return dispatch(thunkLogin(payload))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
      });
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <ul>
                {errors.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
            <input type="text" placeholder="Username or Email" value={credential} onChange={(e) => setCredential(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required ></input>
            <button>Log-in</button>
        </form>
    )
}
