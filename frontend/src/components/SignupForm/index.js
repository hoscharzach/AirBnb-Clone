import './signupform.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSignup } from '../../store/session'
import { Redirect } from 'react-router-dom'

export default function SignupForm() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [confirmPassword, setConfirmPassword] = useState('')

    if (user) return <Redirect to="/" />

    function onSubmit (e) {
        e.preventDefault()
        setErrors([])

        if (password === confirmPassword) {
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
                // console.log(data)
                if (data && data.errors) setErrors(data.errors);
              });
        } else setErrors(["Passwords do not match"])
    }

    return (
        <>
        <h1 className='signup-form-title'>Create an Account</h1>
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"></input>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First name"></input>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name"></input>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password"></input>
            <button>Sign Up</button>
        </form>
        </>
    )
}
