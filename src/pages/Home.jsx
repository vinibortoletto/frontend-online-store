import React, { Component } from 'react';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    inputText: '',
    dataProduct: [],
    category: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
  };

  handleClick = async () => {
    const { inputText, category } = this.state;
    const result = await getProductsFromCategoryAndQuery(category, inputText);
    console.log(result);
    this.setState({
      dataProduct: result.results,
    });
  };

  render() {
    const { dataProduct } = this.state;
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
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </div>
    );
    const productList = (
      dataProduct.map((product, index) => (
        <li key={ index } data-testid="product">
          <h2>{product.title}</h2>
          <img src={ product.thumbnail } alt={ product.title } />
          <h4>{product.price}</h4>
        </li>
      ))
    );

    return (
      <div>
        { form }
        { validation
        && (<h2 data-testid="home-initial-message">{ initialMessage }</h2>) }
        <Categories />
        { !validation
          ? (productList) : ('Nenhum produto foi encontrado') }
      </div>
    );
  }
}

export default Home;
