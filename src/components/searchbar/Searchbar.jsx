import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosSearch } from 'react-icons/io';
import s from '../searchbar/Searchbar.module.css';
toast.configure();
export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const searchQuery = e => {
    setQuery(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please, enter a name!');
      return;
    }
    setQuery('');
    onSubmit(query);
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>
          <IoIosSearch />
        </button>
        <input
          name="query"
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={searchQuery}
          value={query}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
