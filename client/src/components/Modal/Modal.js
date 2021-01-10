import React from 'react';
import './Modal.scss';

const Modal = (props) => {
  const {
    showModal,
    setShowModal,
    loadingDisplay
  } = props;

  const closeModal = () => {
    console.log('clicked');
    if (!loadingDisplay) {
      setShowModal(false);
    }
  }

  return (
    <div className={`modal-background fade-in-animation ${!showModal ? "hide-content" : ""}`}>
      {!loadingDisplay && <span className="close-modal" onClick={closeModal}>X</span>}
      <div className="modal-content">{props.children}</div>
    </div>
  );
}

export default Modal;