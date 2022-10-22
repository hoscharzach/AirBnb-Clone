import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteListing from './DeleteListing'
import './deletelistingmodal.css'

export default function DeleteListingModal({ spot, redirect }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={(e) => setShowModal(true)} className="min-w-[64px] airbnb-button p-2 rounded-xl text-white">Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteListing setShowModal={setShowModal} spot={spot} redirect={redirect} />
        </Modal>
      )}
    </>
  );
}
