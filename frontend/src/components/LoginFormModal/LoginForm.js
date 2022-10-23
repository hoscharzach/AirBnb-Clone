import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import './loginmodal.css'
import { useSelector } from "react-redux";
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

function LoginForm({ setShowModal, variant }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const clickX = (e) => {
    setShowModal(false)
  }

  // useEffect(() => {

  //   if (setShowModal) {
  //     document.body.style.position = 'fixed'
  //     document.body.style.paddingRight = '15px'
  //   }
  //   return () => {
  //     document.body.style.position = 'static'
  //     document.body.style.paddingRight = '0'
  //   }
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.thunkLogin({ credential, password: loginPassword }))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const user = useSelector(state => state.session.user)

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [signupErrors, setSignupErrors] = useState([])


  if (user) return <Redirect to="/" />


  async function onSubmit(e) {
    e.preventDefault()
    setHasSubmitted(true)

    if (errors.length === 0) {
      const payload = {
        username,
        email,
        firstName,
        lastName,
        password,
      }

      await dispatch(sessionActions.thunkSignup(payload))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setSignupErrors(data.errors);
        });
    }
  }

  return (
    <>
      {variant === "LOGIN" &&
        <div className='w-[90vw] max-w-[600px] flex flex-col'>
          {/* header */}
          <div className='h-[50px] flex items-center border-b px-5'>
            <button className='w-max hover:bg-slate-300 p-2 rounded-full' onClick={() => setShowModal(false)} ><img className="h-[14px] w-[14px]" src={x} alt=""></img></button>
            <div className='flex justify-center w-full'>

              <h2 className='text-lg relative right-4'>
                Log in
              </h2>
            </div>
          </div>
          <div className='flex flex-col items-start p-8'>
            <ul className="text-base text-red-600 mb-2">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
            <div className="title-text-container">
              <div className="text-2xl font-bold mb-6">Welcome to Airbnb</div>
            </div>
            <form onSubmit={handleSubmit} className="w-full">

              <input className=" text-lg h-[56px] w-full border rounded-t-xl p-4 border-slate-400"
                type="text"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
              />


              {/* Password */}
              <input className="text-lg h-[56px] w-full border rounded-b-xl p-4 border-slate-400 border-t-0"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button type="submit" className=" my-4 h-14 w-full text-white rounded-xl airbnb-button text-lg font-bold">Continue</button>
            </form>

          </div>


        </div>
      }
      {variant === 'SIGNUP' &&
        <>
          <div className='w-[90vw] max-w-[600px] flex flex-col  '>
            {/* header */}
            <div className='h-[50px] flex items-center border-b px-5 overflow-y-auto'>
              <button className='w-max hover:bg-slate-300 p-2 rounded-full' onClick={() => setShowModal(false)} ><img className="h-[14px] w-[14px]" src={x} alt=""></img></button>
              <div className='flex justify-center w-full'>

                <h2 className='text-lg relative right-4'>
                  Sign up
                </h2>
              </div>
            </div>
            <div className='flex flex-col items-start p-8'>
              <ul className="text-base text-red-600 mb-2">
                {signupErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
              <div className="title-text-container">
                <div className="text-2xl font-bold mb-6">Welcome to Airbnb</div>
              </div>
              <form className="w-full child:w-full child:h-[50px] " onSubmit={onSubmit} id="sign-up-form">
                <input className="p-4 text-lg h-[56px] w-full border border-slate-400 rounded-t-xl " value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"></input>

                <input className="p-4 text-lg h-[56px] w-full border border-slate-400 border-t-0" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First name"></input>

                <input className="p-4 text-lg h-[56px] w-full border border-slate-400 border-t-0" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name"></input>

                <input className="p-4 text-lg h-[56px] w-full border border-slate-400 border-t-0 " value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>

                <input className="p-4 text-lg h-[56px] w-full border border-slate-400 border-t-0 " value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>

                <input className="p-4 text-lg h-[56px] w-full border border-t-0 border-slate-400 rounded-b-xl " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password"></input>
                <button className="mt-4 airbnb-button" disabled={disableSubmit} type='submit'>Sign Up</button>
              </form>
            </div>
          </div>

        </>
      }



    </>
  );
}

export default LoginForm;
