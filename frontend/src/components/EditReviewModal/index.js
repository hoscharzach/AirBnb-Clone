import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from '../AddReviewModal/AddReview';
import EditReview from './EditReview'

export default function EditReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="bg-slate-400 text-white p-2 rounded-xl text-xs active:translate-x-0.5 active:translate-y-0.5" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview setShowModal={setShowModal} review={review} />
        </Modal>
      )}
    </>
  );
}
