import React from 'react';
import { string, number, shape } from 'prop-types';

export default class ProductDetails extends React.Component {
  render() {
    const { selectedProduct: { thumbnail, title, price } } = this.props;

    return (
      <div>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{price}</p>
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
