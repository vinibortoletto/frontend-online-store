import { arrayOf, func, shape } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {
  render() {
    const {
      dataProduct,
      getSelectedProduct,
      addToCart,
    } = this.props;

    return (
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {dataProduct.map((product) => (
          <li
            key={ product.id }
            data-testid="product"
            className="bg-white rounded-sm p-6 text-center relative shadow"
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
              <h2 className="max-w-[200px] font-bold mb-2 truncate text-ellipsis">
                {product.title}
              </h2>
              <h4 className="font-bold text-blue-600 text-lg">
                R$
                {product.price}
              </h4>

              {product.shipping.free_shipping && (
                <h5
                  className="rounded-sm bg-blue-600 text-white font-bold text-sm p-2
                    absolute top-4 right-4"
                  data-testid="free-shipping"
                >
                  Frete Grátis
                </h5>
              )}
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
  }
}

ProductList.propTypes = {
  dataProduct: arrayOf(shape({})).isRequired,
  getSelectedProduct: func.isRequired,
  addToCart: func.isRequired,
};
