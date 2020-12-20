import React from 'react';
import './Modal.scss';

const Modal = (props) => {
  const {
    showModal,
    setShowModal
  } = props;

  const closeModal = () => {
    console.log('clicked');
    setShowModal(false);
  }

  return (
    <div className={`modal-background ${!showModal ? "hide-content" : ""}`}>
      <span className="close-modal" onClick={closeModal}>X</span>
      <div className="modal-content">{props.children}</div>
    </div>
  );
}

export default Modal;