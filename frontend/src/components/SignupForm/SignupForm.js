import './signupform.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkSignup } from '../../store/session'

export default function SignupForm() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    function onSubmit (e) {
        e.preventDefault()
        setErrors([])

        const payload = {
            username,
            email,
            firstName,
            lastName,
            password,
        }

        dispatch(thunkSignup(payload))
        .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <>
        <h1>Hello from signup form</h1>
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"></input>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name"></input>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="LastName"></input>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
            <button>Sign Up</button>
        </form>
        </>
    )
}
