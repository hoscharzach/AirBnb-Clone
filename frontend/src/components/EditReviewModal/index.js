import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './EditReview'

export default function EditReviewModal ({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-review-modal-button" onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview setShowModal={setShowModal} review={review} />
        </Modal>
      )}
    </>
  );
}
