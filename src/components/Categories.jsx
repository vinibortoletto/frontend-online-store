import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class Categories extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    this.setState({
      categories: await api.getCategories(),
    });
  }

  render() {
    const { categories } = this.state;
    const { searchProducts } = this.props;
    return (
      <ul>
        { categories.map(({ id, name }) => (
          <li key={ id }>
            <button
              data-testid="category"
              onClick={ () => searchProducts(id) }
              type="button"
            >
              { name }
            </button>
          </li>
        )) }
      </ul>
    );
  }
}

Categories.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};
