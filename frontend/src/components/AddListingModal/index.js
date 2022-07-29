import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddListing from './AddListing'
import './listingmodal.css'

export default function AddListingModal () {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='create-new-spot-link' onClick={() => setShowModal(true)}>Become a Host</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddListing setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
