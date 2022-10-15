import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListing from './EditListing'
import editButton from '../../assets/images/icons/edit-svgrepo-com.svg'

function EditListingModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={(e) => {
        e.stopPropagation()
        setShowModal(true)
      }} className="min-w-[64px] airbnb-button p-2 rounded-xl text-white active:translate-y-0.5 active:translate-x-0.5">Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListing setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;
