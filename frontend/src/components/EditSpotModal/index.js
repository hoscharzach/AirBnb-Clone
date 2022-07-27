import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListing from './EditListing'

function EditListingModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListing setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;
