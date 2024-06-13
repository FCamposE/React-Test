import React from 'react';

const ConfirmDeleteModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the product {product.name}?</p>
        <button type="button" onClick={onConfirm}>Yes</button>
        <button type="button" onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;