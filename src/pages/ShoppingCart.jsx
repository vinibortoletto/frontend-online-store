import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ShoppingCart extends Component {
  render() {
    const { cartList, increaseItens, decreaseItens, deleteItens } = this.props;
    const validationInitialMessage = cartList.length === 0;
    const initialMessage = 'Seu carrinho está vazio';
    return (
      <div>
        {
          validationInitialMessage
            ? (<h2 data-testid="shopping-cart-empty-message">{ initialMessage }</h2>)
            : (cartList.map((itens, index) => (
              <li key={ index }>
                <button
                  type="button"
                  value={ itens.id }
                  onClick={ (e) => deleteItens(e.target.value) }
                  data-testid="remove-product"
                >
                  X
                </button>
                <h2
                  data-testid="shopping-cart-product-name"
                >
                  {itens.title}
                </h2>
                <img src={ itens.img } alt={ itens.title } />
                <h4>{itens.price}</h4>
                <button
                  type="button"
                  value={ itens.id }
                  onClick={ (e) => decreaseItens(e.target.value) }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
                <h4 data-testid="shopping-cart-product-quantity">{itens.qttd}</h4>
                <button
                  type="button"
                  value={ itens.id }
                  onClick={ (e) => increaseItens(e.target.value) }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
              </li>
            ))
            )
        }

        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Finalizar compra
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.instanceOf(Array),
  decreaseItens: PropTypes.func,
  increaseItens: PropTypes.func,
  deleteItens: PropTypes.func,
}.isRequired;
