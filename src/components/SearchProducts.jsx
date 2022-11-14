import { func } from 'prop-types';
import React from 'react';

export default class SearchProductsForm extends React.Component {
  render() {
    const { handleChange, searchProducts } = this.props;

    return (
      <form
        className="max-w-xs mx-auto my-10"
        onSubmit={ searchProducts }
      >
        <label htmlFor="name" className="w-full">
          <input
            type="text"
            name="name"
            id="name"
            data-testid="query-input"
            placeholder="Digite seu produto"
            onChange={ handleChange }
            className="border p-2 w-full mb-2"
          />
        </label>

        <button
          type="submit"
          data-testid="query-button"
          className="w-full bg-teal-400 text-slate-100 font-bold rounded p-2"
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchProductsForm.propTypes = {
  handleChange: func.isRequired,
  searchProducts: func.isRequired,
};
