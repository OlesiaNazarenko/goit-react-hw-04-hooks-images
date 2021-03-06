import React, { useState, useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/searchbar/Searchbar';
import ImageGallery from 'components/imageGallery/ImageGallery';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import Spinner from 'components/spinner/Spinner';
import API from 'components/API/API';
toast.configure();
function scrollPageDown() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalContent, setModalContent] = useState('');
  const [alt, setAlt] = useState('');
  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const getResults = () => {
      API(query, page)
        .then(hits => {
          if (hits.length === 0) {
            toast.warn('There are no images. Try another request, please', {
              transition: Bounce,
            });
          }
          setImages(prevImages => {
            return [...prevImages, ...hits];
          });
          scrollPageDown();
        })
        .finally(() => {
          return setLoading(false);
        });
    };
    getResults();
  }, [query, page]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const getImageForModal = itemId => {
    const element = images.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
    setAlt(element.tags);
  };
  const pageIncrement = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };
  const isNotLastPage = images.length / page === 12;
  const btnEnable = images.length > 0 && !loading && isNotLastPage;
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery
          data={images}
          getImageForModal={getImageForModal}
          openModal={toggleModal}
        />
      )}
      {loading && <Spinner />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageUrl={modalContent} alt={alt} />
      )}
      {btnEnable && <Button onClick={pageIncrement} />}
    </>
  );
}
