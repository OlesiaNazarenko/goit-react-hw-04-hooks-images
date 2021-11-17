import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from '../modal/Modal.module.css';
import PropTypes from "prop-types";


const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
    static propTypes = {
        largeImageUrl: PropTypes.string.isRequired,
        
    };
    componentDidMount() {
       
        window.addEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                this.props.onClose()
            }
            
    }
    handleBackdropClick = (e) => {
            if (e.currentTarget === e.target) {
                this.props.onClose()
            }
            
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    
    //   toggleModal = ()=>{}
    render(){
        
        return createPortal(
        <div className={s.Overlay} onClick={this.handleBackdropClick} >
            <div className={s.Modal}>
                    <img src={this.props.largeImageUrl} alt="" />
            </div>
        </div>,
        modalRoot
        // <button>Modal</button>
    )

    }
}
