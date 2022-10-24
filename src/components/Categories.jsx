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
        className="shadow-2xl w-64 bg-white rounded-sm
          absolute -left-[65%] hover:left-0 transition-all
          "
      >
        <ul className="flex flex-col gap-2 p-4">
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

// <label htmlFor="category">
//               <input
//                 type="radio"
//                 id="category"
//                 name="category"
//                 data-testid="category"
//                 value={ name }
//                 checked={ checkedValue === name }
//                 onChange={ (event) => this.handleChange(event, id) }
//                 className=""
//               />
//               { name }
//             </label>
