import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  componentDidMount() {
    this.getCartLength();
  }

  getCartLength = () => {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    let cartLength = 0;

    if (localCart) {
      cartLength = localCart.reduce((acc, { qttd }) => acc + qttd, 0);
      localStorage.setItem('cartLength', JSON.stringify(cartLength));
    }

    return cartLength;
  };

  render() {
    return (
      <header>
        <button type="button">
          <Link
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            <span data-testid="shopping-cart-size">{this.getCartLength()}</span>
            <span> Carrinho de compras </span>
          </Link>
        </button>
      </header>
    );
  }
}
