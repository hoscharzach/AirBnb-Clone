import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteListing from './DeleteListing'

export default function DeleteListingModal ({spot, redirect}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteListing setShowModal={setShowModal} spot={spot} redirect={redirect}/>
        </Modal>
      )}
    </>
  );
}
