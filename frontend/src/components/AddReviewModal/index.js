import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './AddReview'

export default function AddReviewModal ({spot, review, type}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{type} Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview setShowModal={setShowModal} spot={spot} review={review} />
        </Modal>
      )}
    </>
  );
}
