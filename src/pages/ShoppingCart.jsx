import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  render() {
    const { cartList } = this.props;
    const validationInitialMessage = cartList.length === 0;
    const initialMessage = 'Seu carrinho está vazio';
    return (
      <div>
        {
          validationInitialMessage
            ? (<h2 data-testid="shopping-cart-empty-message">{ initialMessage }</h2>)
            : (cartList.map((itens, index) => (
              <li key={ index }>
                <h2
                  data-testid="shopping-cart-product-name"
                >
                  {itens.title}
                </h2>
                <img src={ itens.img } alt={ itens.title } />
                <h4>{itens.price}</h4>
                <h4 data-testid="shopping-cart-product-quantity">{itens.qttd}</h4>
              </li>
            ))
            )
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.instanceOf(Array).isRequired,
};
