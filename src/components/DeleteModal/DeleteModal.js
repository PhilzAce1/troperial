import React from 'react';
import './DeleteModal.css';
import img from '../../assets/images/troperial-delete.PNG';
import close from '../../assets/images/Close.png';
const DeleteModal = ({ handleClose, handleDelete }) => {
  return (
    <div className="delete__modal-container" onClick={handleClose}>
      <div className="delete__modal">
        <img
          onClick={handleClose}
          className="delete__modal-icon"
          src={close}
          alt="close"
        />
        <p className="delete__modal-title">Delete a listing</p>
        <img className="bin" src={img} alt="delete" />
        <p className="delete__modal-confirm-message">
          Are you sure you want to delete this listing?
        </p>
        <button className="delete__modal-btn">
          Yes, Delete this listing
        </button>
        <button
          className="delete__modal-cancel-btn"
          onClick={handleDelete}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
