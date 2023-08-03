import React from 'react';
import css from './Searchbar.module.css';

function Searchbar({ onSearch }) {
  const onSubmit = e => {
    e.preventDefault();
    onSearch(e.currentTarget.serchInput.value);
  };

  return (
    <header className={css.searchbar}>
      <a href="index.html">
        <img
          src={require('../images/logo-661013_1280.webp')}
          alt="pixabay"
          className={css.headerImg}
        />
      </a>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          name="serchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

export default Searchbar;
