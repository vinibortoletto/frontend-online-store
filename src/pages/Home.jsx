import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    inputText: '',
    dataProduct: [],
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
  };

  searchProducts = async (categoryId) => {
    const { inputText } = this.state;
    const result = await getProductsFromCategoryAndQuery(categoryId, inputText);
    this.setState({
      dataProduct: result.results,
    });
  };

  render() {
    const { dataProduct } = this.state;
    const { addToCart, getSelectedProduct } = this.props;
    const validation = dataProduct.length === 0;
    const initialMessage = 'Digite algum termo de pesquisa ou escolha uma categoria.';

    const form = (
      <div>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id=""
            data-testid="query-input"
            placeholder="Digite seu produto"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.searchProducts }
        >
          Pesquisar
        </button>
      </div>
    );
    const productList = (
      dataProduct.map((product) => (
        <li key={ product.id } data-testid="product">
          <Link
            to="/product-details"
            data-testid="product-detail-link"
            onClick={ () => getSelectedProduct(product) }
          >
            <h2>{product.title}</h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <h4>{product.price}</h4>
          </Link>
          <button
            type="button"
            onClick={ () => addToCart(product) }
            data-testid="product-add-to-cart"
          >
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))
    );

    return (
      <div>
        { form }
        { validation
        && (<h2 data-testid="home-initial-message">{ initialMessage }</h2>) }
        <Categories searchProducts={ this.searchProducts } />
        { !validation
          ? (productList) : ('Nenhum produto foi encontrado') }
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getSelectedProduct: PropTypes.func.isRequired,
};

export default Home;
