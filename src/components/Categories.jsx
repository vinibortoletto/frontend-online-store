import React, { Component } from 'react';
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
    return (
      <ul>
        { categories.map((category) => (
          <li key={ category.id } data-testid="category">
            <button type="button">{ category.name }</button>
          </li>
        )) }
      </ul>
    );
  }
}
