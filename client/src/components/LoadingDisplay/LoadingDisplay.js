import React, { useMemo } from 'react';
import Modal from '../Modal';
import './LoadingDisplay.scss';

const LoadingDisplay = (props) => {

  const {
    loading
  } = props;

  const ModalProps = useMemo(() => {
    return {
      loadingDisplay: true,
      showModal: loading,
      setShowModal: null
    }
  }, [loading])

  return (
    <>
      {loading && (
        <Modal {...ModalProps}>
          <div className="loading-container">
            <div className="spinner-holder">
              <div className="spinner"></div>
              <div className="spin-around"></div>
            </div>
            <h3>Loading...</h3>
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoadingDisplay;