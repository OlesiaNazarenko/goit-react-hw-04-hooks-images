import PropTypes from 'prop-types';
import s from '../imageGalleryItem/ImageGalleryItem.module.css';

export default function ImageGalleryItem({ itemId, webformatURL, tags, onClick}) {
  return (
     <li className={s.ImageGalleryItem}  >
        <img className={s['ImageGalleryItem-image']} src={webformatURL} alt={tags} onClick={() => { onClick(itemId) }} />
     </li>
    )

}
//  {}()   :
ImageGalleryItem.propTypes = {
      onClick:PropTypes.func,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
  
}; 