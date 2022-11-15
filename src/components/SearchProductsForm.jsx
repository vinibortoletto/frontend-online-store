import { func, string } from 'prop-types';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default class SearchProductsForm extends React.Component {
  render() {
    const {
      handleChange,
      searchProducts,
      inputText,
    } = this.props;

    return (
      <div className="w-full max-w-[50rem] mb-10 flex">
        <label htmlFor="name" className="w-full">
          <input
            type="text"
            name="name"
            id="name"
            value={ inputText }
            data-testid="query-input"
            placeholder="Digite seu produto"
            onChange={ handleChange }
            className="border p-2 w-full"
          />
        </label>

        <button
          type="button"
          data-testid="query-button"
          className="bg-teal-400 text-slate-100 font-bold rounded py-2 px-4"
          onClick={ searchProducts }
        >
          <FaSearch />
        </button>
      </div>
    );
  }
}

SearchProductsForm.propTypes = {
  handleChange: func.isRequired,
  searchProducts: func.isRequired,
  inputText: string.isRequired,
};
