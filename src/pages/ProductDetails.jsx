import React from 'react';
import { string, number, shape } from 'prop-types';

export default class ProductDetails extends React.Component {
  addInCart = () => {
    const { selectedProduct } = this.props;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const trueCart = (cart) || [];
    trueCart.push(selectedProduct);
    localStorage.setItem('cart', JSON.stringify(trueCart));
  };

  render() {
    const { selectedProduct: { thumbnail, title, price } } = this.props;

    return (
      <div>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addInCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  selectedProduct: shape({
    thumbnail: string,
    title: string,
    price: number,
  }).isRequired,
};
