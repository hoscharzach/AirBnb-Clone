import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './AddReview'

export default function AddReviewModal ({spot, review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-review-modal-button" onClick={() => setShowModal(true)}>Add Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview setShowModal={setShowModal} spot={spot} review={review} />
        </Modal>
      )}
    </>
  );
}
