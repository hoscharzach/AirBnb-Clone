import { thunkLogin, logout } from "../../store/session";
import '../../components/LoginFormPage/loginform.css'
import { useState} from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginFormPage () {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')

    if (user) {
        return (
            <>
            <h1>Already logged in</h1>
            <Redirect to="/" />
            </>
        )
    }


    function handleSubmit(e) {
        e.preventDefault()

        const payload = {
            credential,
            password
        }

        dispatch(thunkLogin(payload))
        history.push('/')
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="text" placeholder="Username or email" value={credential} onChange={(e) => setCredential(e.target.value)} />
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button>Log-in</button>
        </form>
    )
}
