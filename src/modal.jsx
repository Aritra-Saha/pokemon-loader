// Modal.js
import React from 'react';
import './modal.css'; // Importing CSS for styling

const Modal = ({ children, isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={closeModal} className="close-button">X</button>
      </div>
    </div>
  );
};

export default Modal;
