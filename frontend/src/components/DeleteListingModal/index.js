import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteListing from './DeleteListing'
import './deletelistingmodal.css'
import deleteButton from '../../assets/images/icons/delete-svgrepo-com.svg'

export default function DeleteListingModal ({spot, redirect}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="delete-listing-button" onClick={() => setShowModal(true)}><img id="delete-listing-icon" src={deleteButton} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteListing setShowModal={setShowModal} spot={spot} redirect={redirect}/>
        </Modal>
      )}
    </>
  );
}
