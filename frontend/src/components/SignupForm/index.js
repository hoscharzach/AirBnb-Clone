import './signupform.css'
import { useState, useEffect } from 'react'
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
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)

    useEffect(() => {
        const errors = []
        if (username.length < 5) errors.push('Username must be at least 5 characters')
        if (password.length < 6) errors.push('Password must be at least 5 characters')

        setErrors(errors)
        if (errors.length > 0 && hasSubmitted === true) {
            setDisableSubmit(true)
        } else setDisableSubmit(false)

}, [username, password])

    if (user) return <Redirect to="/" />


    function onSubmit (e) {
        e.preventDefault()

        setHasSubmitted(true)
        if (password !== confirmPassword) {
            setErrors(...errors, ['Passwords do not match'])
            return
        }

        if (errors.length === 0) {
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
                if (data && data.errors) setErrors(data.errors);
              });
        }

    }

    return (
        <>
        <h1 className='signup-form-title'>Create an Account</h1>
        <form className="create-listing-form" onSubmit={onSubmit} id="sign-up-form">
            <ul>
                {hasSubmitted && errors.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
            <input id="create-listing-top-input" value={username} minLength="5" required onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"></input>
            <input value={firstName} required onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First name"></input>
            <input value={lastName} required onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name"></input>
            <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
            <input value={password} minLength="6" required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
            <input id='create-listing-bottom-input' value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password"></input>
            <button disabled={disableSubmit} type='submit' id='signup-submit-button'>Sign Up</button>
        </form>
        </>
    )
}
