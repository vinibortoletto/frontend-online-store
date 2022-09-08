import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    cartList: [],
  };

  render() {
    const { cartList } = this.state;
    const validationInitialMessage = cartList.length === 0;
    const initialMessage = 'Seu carrinho está vazio';

    return (
      <div>
        { validationInitialMessage
        && (<h2 data-testid="shopping-cart-empty-message">{ initialMessage }</h2>) }
      </div>
    );
  }
}
