import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import s from '../imageGallery/ImageGallery.module.css';
export default function ImageGallery({ data, openModal, getImageForModal }) {
  return (
    <ul className={s.ImageGallery} onClick={openModal}>
      {data.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={getImageForModal}
            itemId={id}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }),
  ),
  openModal: PropTypes.func,
  getImageForModal: PropTypes.func,
};
