import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReview from './DeleteReview'

export default function DeleteReviewModal ({ review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-review-modal-button" onClick={() => setShowModal(true)}>Delete Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReview setShowModal={setShowModal} review={review} />
        </Modal>
      )}
    </>
  );
}
