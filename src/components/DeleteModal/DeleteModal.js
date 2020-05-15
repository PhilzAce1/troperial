import React from 'react';
import './DeleteModal.css';
import img from '../../assets/images/troperial-delete.PNG';
const DeleteModal = ({handleClose, handleDelete}) => {
    return (
        <div className="delete__modal-container" onClick={handleClose}>
            <div className="delete__modal">
                <span className="delete__modal-icon" onClick={handleClose}><i className="fas fa-times"></i></span>
                <p className="delete__modal-title">Delete a listing</p>
                <img src={img} alt="delete"/>
                <p className="delete__modal-confirm-message">Are you sure you want to delete this listing?</p>
                <button className="delete__modal-btn">Yes, Delete this listing</button>
                <button className="delete__modal-cancel-btn" onClick={handleDelete}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteModal
