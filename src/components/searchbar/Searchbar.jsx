import React, {Component} from 'react';
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoIosSearch } from "react-icons/io";
import s from '../searchbar/Searchbar.module.css';
// import PropTypes from 'prop-types';

toast.configure()

export default class Searchbar extends Component{

  state = {
    query: '',
  };
  
  searchQuery = e  => { this.setState({ query:  e.currentTarget.value})}

  handleSubmit = e => {
        e.preventDefault();
         if (this.state.query.trim() === '') {
          toast.error('Please, enter a name!');
          return;
        }
        this.setState({query: ''})
        this.props.onSubmit(this.state.query);
    }

render(){
  return (
     <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>< IoIosSearch/>
        </button>

        <input
          name='query'
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.searchQuery}
          value={this.state.query}
        />
      </form>
    </header>
   )
}
}
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
