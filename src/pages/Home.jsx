import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SearchProductsForm from '../components/SearchProducts';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';

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

    return (
      <div className="lg:grid lg:grid-cols-2">
        <Categories searchProducts={ this.searchProducts } />

        <div className="ml-10">
          <div className="w-[90%] mx-auto">

            <SearchProductsForm
              handleChange={ this.handleChange }
              searchProducts={ this.searchProducts }
            />

            {isLoading
              ? <Loading />
              : (
                <div className="lg:p-10 lg:ml-64 flex justify-center">
                  { !validation
                    ? (
                      <ProductList
                        dataProduct={ dataProduct }
                        getSelectedProduct={ getSelectedProduct }
                        addToCart={ addToCart }
                      />
                    )
                    : (
                      <p className="text-xl mt-10">Nenhum produto foi encontrado</p>
                    )}
                </div>
              )}
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
