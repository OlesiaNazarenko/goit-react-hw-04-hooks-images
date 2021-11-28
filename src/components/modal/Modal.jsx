import React, { useEffect, useCallback } from 'react';
import s from '../modal/Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('modal-root');
export default function Modal({ largeImageUrl, alt, onClose }) {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );
  const handleBackdropClick = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose],
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={largeImageUrl} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
