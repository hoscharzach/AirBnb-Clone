import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListing from './EditListing'
import editButton from '../../assets/images/icons/edit-svgrepo-com.svg'

function EditListingModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-listing-button" onClick={() => setShowModal(true)}><img id="edit-listing-icon" src={editButton} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListing setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;
