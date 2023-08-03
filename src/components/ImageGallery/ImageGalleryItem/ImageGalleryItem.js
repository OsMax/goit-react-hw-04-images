import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ info, onModalOpen }) {
  return (
    <li className={css.item} onClick={onModalOpen}>
      <img
        className={css.itemImg}
        src={info.webformatURL}
        lsrc={info.largeImageURL}
        alt={info.tag}
        loading="lazy"
      />
    </li>
  );
}

export default ImageGalleryItem;
