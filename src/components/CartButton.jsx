// Libs
import React from 'react';
import { number } from 'prop-types';
import { Link } from 'react-router-dom';

// Images
import { FaShoppingCart } from 'react-icons/fa';

export default class CartButton extends React.Component {
  render() {
    const { cartLength } = this.props;

    return (
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
              {cartLength}
            </p>
          </div>
          <span className="text-slate-100 text-3xl">
            <FaShoppingCart />
          </span>
        </Link>
      </button>
    );
  }
}

CartButton.propTypes = {
  cartLength: number.isRequired,
};
