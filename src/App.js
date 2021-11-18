import React, { Component } from 'react';
import { toast, Flip, Bounce } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Searchbar from 'components/searchbar/Searchbar'
import ImageGallery from 'components/imageGallery/ImageGallery'
import Button from 'components/button/Button'
import Modal from 'components/modal/Modal'
import Spinner from 'components/spinner/Spinner'
import API from 'components/API/API'

toast.configure()

function scrollPageDown() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

export default class App extends Component {
  state = {
    showModal: false,
    images: [],
    loading: false,
    query: '',
    page: 1,
    modalContent:'',
      
  }

  pageIncrement = () => {
    this.setState({ page: this.state.page + 1})
  };

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1  })
  };
  
  componentDidUpdate(prevProps, prevState) {
   
    const { query: currentQuery, page: currentPage } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (prevQuery !== currentQuery) {
        this.setState({ loading: true })
      this.setState({ page: 1 , images:[]});
      API(currentQuery, currentPage).then(hits => {
     
          if (hits.length === 0 ) {
           toast.warn('There are no images. Try another request, please', {
             transition: Bounce
           });
        }
        
        this.setState({ images: [...hits] });
        scrollPageDown();
      }).finally(() => { return this.setState({ loading: false }) })
    }

    if (prevPage !== currentPage) {
        this.setState({ loading: true })
      API(currentQuery, this.state.page).then(
        hits => {
          this.setState(prevState => ({ images: [...prevState.images, ...hits] }))
          scrollPageDown();
        }
      ).finally(() => { return this.setState({ loading: false }) })
    }
  }


  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  };

  getImageForModal = (itemId) => {
    const { images } = this.state;
    const element = images.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  
  };


  render() {
    const  { images, page, loading, showModal,modalContent } = this.state;
    const isNotLastPage = images.length / page === 12;
    const btnEnable = images.length > 0 && !loading && isNotLastPage;
   
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length !== 0  && <ImageGallery data={images} getImageForModal={this.getImageForModal} openModal={this.toggleModal} />}
        {loading  && <Spinner />}
        {showModal && <Modal onClose={this.toggleModal} largeImageUrl={modalContent} />}
        {btnEnable  && <Button onClick={this.pageIncrement} />}
      </>
    )
           
  };

}