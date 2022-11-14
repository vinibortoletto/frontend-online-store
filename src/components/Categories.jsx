import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class Categories extends Component {
  state = {
    categories: [],
    checkedValue: '',
  };

  async componentDidMount() {
    this.setState({
      categories: await api.getCategories(),
    });
  }

  handleChange = (event, id) => {
    const { searchProducts } = this.props;
    this.setState({ checkedValue: event.target.value });
    searchProducts(id);
  };

  render() {
    const { categories, checkedValue } = this.state;

    return (
      <div
        className="categories shadow-2xl min-w-[16rem] bg-white rounded-sm fixed
        overflow-hidden top-0 -left-56 lg:static lg:left-0 hover:left-0
        transition-all z-10"
      >
        <h2 className="font-bold text-lg text-center mt-10">Categorias</h2>
        <ul className="flex flex-col gap-2 p-4 overflow-auto h-screen lg:h-full">
          { categories.map(({ id, name }) => (
            <li key={ id }>
              <label htmlFor={ name }>
                <input
                  type="radio"
                  id={ name }
                  name="category"
                  data-testid="category"
                  value={ name }
                  checked={ checkedValue === name }
                  onChange={ (event) => this.handleChange(event, id) }
                  className=""
                />
                <span className="ml-2">{ name }</span>
              </label>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};
