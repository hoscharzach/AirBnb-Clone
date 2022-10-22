import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginmodal.css'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const clickX = (e) => {
    setShowModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.thunkLogin({ credential, password }))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className=" my-4 h-14 w-full text-white rounded-xl airbnb-button text-lg font-bold">Continue</button>
          </form>

        </div>


      </div>



    </>
  );
}

export default LoginForm;
