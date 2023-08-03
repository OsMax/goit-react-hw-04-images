/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onModalClose, children }) {
  const onEscape = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscape);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  return createPortal(
    <div className={css.overlay} onClick={onModalClose}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
