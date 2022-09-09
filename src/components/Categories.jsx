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
        { categories.map((category) => (
          <li key={ category.id }>
            <button
              data-testid="category"
              onClick={ searchProducts }
              type="button"
            >
              { category.name }
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
