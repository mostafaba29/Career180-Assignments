import React from "react";
import "./modal.css"; 

const Modal = ({ show, onClose, onConfirm,title,text }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{text}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
