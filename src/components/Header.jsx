import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import CartButton from './CartButton';

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
      <header className="bg-blue-700 py-4 px-10 pl-14 lg:pl-10 mb-10">
        <div className="w-[90%] max-w-5xl flex justify-between items-center mx-auto">

          <div>
            <Link to="/">
              <img src={ logo } alt="frontend online store logo" className="w-40" />
            </Link>
          </div>

          <CartButton cartLength={ this.getCartLength() } />
        </div>
      </header>
    );
  }
}
