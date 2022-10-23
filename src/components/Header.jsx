/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';

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
      <header
        className="bg-blue-700 py-4 px-6 mb-4"
      >
        <div className="max-w-5xl flex justify-between items-center m-auto">
          <div>
            <Link to="/">
              <img src={ logo } alt="frontend online store logo" className="w-40" />
            </Link>
          </div>

          <button
            type="button"
            className="relative"
          >
            <Link
              to="/shopping-cart"
              data-testid="shopping-cart-button"
            >
              <div
                data-testid="shopping-cart-size"
                className="w-5 h-5 bg-teal-400 text-slate-100
              font-bold rounded-full flex justify-center items-center
              absolute -right-2 -top-2
              "
              >
                <p>
                  {this.getCartLength()}
                </p>
              </div>
              <span className="text-slate-100 text-3xl">
                <FaShoppingCart />
              </span>
            </Link>
          </button>
        </div>
      </header>
    );
  }
}
