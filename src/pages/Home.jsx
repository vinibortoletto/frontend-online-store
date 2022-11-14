import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SearchProductsForm from '../components/SearchProducts';

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

  searchProducts = async (event, categoryId) => {
    event.preventDefault();
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
      <div className="lg:grid lg:grid-cols-2">
        <Categories searchProducts={ this.searchProducts } />

        <div className="ml-10">
          <div className="w-[90%] mx-auto">

            <SearchProductsForm
              handleChange={ this.handleChange }
              searchProducts={ this.searchProducts }
            />

            {isLoading && 'Loading...'}

            <div className="lg:p-10 lg:ml-64 flex justify-center">
              { !validation && !isLoading
                ? (productList)
                : (
                  <p className="text-xl mt-10">Nenhum produto foi encontrado</p>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getSelectedProduct: PropTypes.func.isRequired,
};

export default Home;
