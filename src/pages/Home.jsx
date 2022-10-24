import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    inputText: '',
    dataProduct: [],
    isLoading: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
  };

  searchProducts = async (categoryId) => {
    const { inputText } = this.state;
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const result = await getProductsFromCategoryAndQuery(categoryId, inputText);
        this.setState({
          dataProduct: result.results,
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { dataProduct, isLoading } = this.state;
    const { addToCart, getSelectedProduct } = this.props;
    const validation = dataProduct.length === 0;

    const form = (
      <div className="flex justify-center mb-2 w-full px-4 ml-32 pt-10">
        <label htmlFor="name" className="w-full max-w-md">
          <input
            type="text"
            name="name"
            id="name"
            data-testid="query-input"
            placeholder="Digite seu produto"
            onChange={ this.handleChange }
            className="border p-2 w-full"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          className="bg-teal-400 text-slate-100 font-bold rounded p-2 ml-2"
          onClick={ this.searchProducts }
        >
          Pesquisar
        </button>
      </div>
    );

    const productList = (
      <ul
        className="grid sm:grid-cols-2 md:grid-cols-3
      gap-4 justify-items-center"
      >
        {dataProduct.map((product) => (
          <li
            key={ product.id }
            data-testid="product"
            className="bg-white rounded-sm p-6 text-center relative"
          >
            <Link
              to={ `/product-details/${product.id}` }
              data-testid="product-detail-link"
              onClick={ () => getSelectedProduct(product) }
            >
              <img
                src={ product.thumbnail }
                alt={ product.title }
                className="w-52 mx-auto"
              />
              <h2 className="font-bold mb-2 truncate text-ellipsis max-w-[150px]">
                {product.title}
              </h2>
              <h4 className="font-bold text-blue-600 text-lg">
                R$
                {product.price}
              </h4>

              {
                product.shipping.free_shipping && (
                  <h5
                    className="w-16 rounded-sm bg-blue-600 text-white text-sm p-2
                    absolute top-4 right-4"
                    data-testid="free-shipping"
                  >
                    Frete Grátis
                  </h5>
                )
              }
            </Link>

            <button
              type="button"
              onClick={ () => addToCart(product) }
              data-testid="product-add-to-cart"
              className="bg-teal-400 text-white font-bold px-2 py-4
              rounded-sm mt-4 w-full"
            >
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ul>
    );

    return (
      <div>

        {/* <div className="flex"> */}
        { form }

        <Categories searchProducts={ this.searchProducts } />

        {isLoading && 'Loading...'}

        <div className="lg:p-10 ml-64 flex justify-center">

          { !validation && !isLoading
            ? (productList)
            : (
              <p className="text-xl mt-10">Nenhum produto foi encontrado</p>
            )}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getSelectedProduct: PropTypes.func.isRequired,
};

export default Home;
