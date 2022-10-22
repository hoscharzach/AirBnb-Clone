import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ variant }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='flex justify-start' onClick={() => setShowModal(true)}>{variant === 'LOGIN' ? 'Log in' : 'Sign up'}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} showModal={showModal} variant={variant} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
