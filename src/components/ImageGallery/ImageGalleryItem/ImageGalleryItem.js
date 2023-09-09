import PropTypes from 'prop-types';
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
ImageGalleryItem.propTypes = {
  info: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tag: PropTypes.string,
  }),
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
