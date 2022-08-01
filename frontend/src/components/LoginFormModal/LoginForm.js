import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginmodal.css'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

function LoginForm({ setShowModal, showModal }) {
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
    dispatch(sessionActions.thunkLogin({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
        <div className="close-out-button" onClick={clickX}>
          <img className="x" src={x} alt=""></img>
        </div>

        <div className="entire-modal-wrapper">

          <div className="modal-header">
            <div className="header-text">
              Log in
            </div>
          </div>

      <div className="modal-body-wrapper">
          <div className="title-text-container">
            <h3>Welcome to Airbnb</h3>
          </div>
        <form onSubmit={handleSubmit}className="create-listing-form">

          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
              ))}
          </ul>
            <input id="create-listing-top-input"
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              />


            {/* Password */}
            <input id="create-listing-bottom-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

          <button id="login-button" type="submit">Continue</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default LoginForm;
