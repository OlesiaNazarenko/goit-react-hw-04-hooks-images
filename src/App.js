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
    this.setState({ page: this.state.page + 1 })
    
  };

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1 , loading: true })
  };
  
  componentDidUpdate(prevProps, prevState) {
    const { query: currentQuery, page: currentPage } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (prevQuery !== currentQuery) {
      this.setState({ loading: true, images: [], page: 1 });
      API(currentQuery, currentPage).then(res => {
        const { hits } = res.data;
        this.setState({ images: [...this.state.images, ...hits] })
      })
    }

    if (prevPage !== currentPage) {
      API(prevQuery, currentPage).then(res => {
        const { hits } = res.data;
        this.setState(prevState => ({ images: [...prevState.images, ...hits] }))
    
      })
    }
  }
    // if (currentQuery !== prevQuery || currentPage !== prevPage) {
    //   API(currentQuery,currentPage ).then(images => {
    //     this.setState({
    //       images: [...prevState.images, ...images.data.hits],
    //       loading: true
    //     })
    // })
    // };
  // }

  // getImages = () => {
  //  const { query, page } = this.state;
  //    API(query, page).then(res => {
  //      if (res.status === 200) {
  //        const { hits } = res.data;
  //        this.setState({
  //          images: [...this.state.images, ...hits]
  //        }
  //        )
  //      }
        
  //       scrollPageDown();
    
  //       if (this.state.images.length === 0) {
  //         toast.warn('There are no images. Try another request, please', {
  //           transition: Bounce
  //         });
  //       }
                
  //       if (res.status === 404) {
  //         throw new Error(res.message || toast.error('Images are not exist', { transition: Flip }));
  //       }
                
  //     }).finally(this.setState({ loading: false }))
  // }

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

  
  // componentDidMount(query, page ) {
  //   this.setState({ query:'', page: 1 })
  // };


  render() {
    // const isNotLastPage = visibleImages.length / page === 12;
    // const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery data={this.state.images} getImageForModal={this.getImageForModal} openModal={ this.toggleModal}/>
        {this.state.loading === true && <Spinner />}
        {this.state.images.length !== 0 && <Button onClick={this.pageIncrement} />}
        {this.state.showModal && <Modal onClose={this.toggleModal} largeImageUrl={this.state.modalContent} />}
      </>
    )
           
  };

}