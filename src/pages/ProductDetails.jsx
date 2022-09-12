import React from 'react';
import { string, number, shape, func } from 'prop-types';

export default class ProductDetails extends React.Component {
  render() {
    const { selectedProduct, addToCart } = this.props;
    const { thumbnail, title, price } = selectedProduct;

    return (
      <div>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCart(selectedProduct) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addToCart: func.isRequired,
  selectedProduct: shape({
    thumbnail: string,
    title: string,
    price: number,
  }).isRequired,
};
