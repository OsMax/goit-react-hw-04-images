import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItems from './ImageGalleryItem';
import Modal from './Modal';

function ImageGallery({ items }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const onModalOpen = e => {
    if (e.target.nodeName === 'IMG' && !modalIsOpen) {
      setModalIsOpen(true);
      setModalUrl(e.target.attributes.lsrc.value);
      document.body.style.overflow = 'hidden';
    }
  };
  const onModalClose = () => {
    setModalIsOpen(false);
    setModalUrl('');
  };

  return (
    <>
      <ul className={css.gallery}>
        {items.map(item => {
          return (
            <ImageGalleryItems
              key={item.id}
              info={item}
              onModalOpen={onModalOpen}
            />
          );
        })}
      </ul>
      {modalIsOpen && (
        <Modal onModalClose={onModalClose}>
          <img src={modalUrl} alt="" className={css.modalImg} loading="lazy" />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ImageGallery;
