import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReview from './DeleteReview'

export default function DeleteReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="bg-red-500 text-white p-2 rounded-xl text-xs active:translate-x-0.5 active:translate-y-0.5" onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReview setShowModal={setShowModal} review={review} />
        </Modal>
      )}
    </>
  );
}
