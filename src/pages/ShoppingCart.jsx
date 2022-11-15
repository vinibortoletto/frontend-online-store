// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Images
import { FaTrash } from 'react-icons/fa';

export default class ShoppingCart extends Component {
  render() {
    const { cartList, increaseItens, decreaseItens, deleteItens } = this.props;
    const validationInitialMessage = cartList.length === 0;
    const initialMessage = 'Seu carrinho está vazio';

    return (
      <div className="max-w-2xl mx-auto">
        {
          validationInitialMessage
            ? (
              <h2
                data-testid="shopping-cart-empty-message"
                className="text-xl text-center mt-10"
              >
                { initialMessage }
              </h2>
            )
            : (
              <div className="px-4">
                <ul className="grid gap-4">
                  {cartList.map((itens, index) => (
                    <li
                      key={ index }
                      className="p-6 flex flex-col sm:flex-row sm:justify-between
                      items-center gap-4 bg-white shadow"
                    >

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={ itens.img }
                          alt={ itens.title }
                        />

                        <h2
                          data-testid="shopping-cart-product-name"
                          className="text-center sm:text-left max-w-[10rem]"
                        >
                          {itens.title}
                        </h2>
                      </div>

                      <div className="flex gap-6">
                        <h4 className="font-bold">{`R$${itens.price}`}</h4>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            value={ itens.id }
                            onClick={ (e) => decreaseItens(e.target.value) }
                            data-testid="product-decrease-quantity"
                            className="bg-slate-400 w-6 h-6 text-white font-bold"
                          >
                            -
                          </button>

                          <span
                            data-testid="shopping-cart-product-quantity"
                          >
                            {itens.qttd}
                          </span>

                          <button
                            type="button"
                            value={ itens.id }
                            onClick={ (e) => increaseItens(e.target.value) }
                            data-testid="product-increase-quantity"
                            className="bg-slate-400 w-6 h-6 text-white font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          value={ itens.id }
                          onClick={ (e) => deleteItens(e.target.value) }
                          data-testid="remove-product"
                          className="text-red-700 text-xl"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="sm:flex sm:justify-center">
                  <button
                    type="button"
                    className="w-full max-w-xs bg-teal-400 text-slate-100 font-bold
                    rounded p-2 mt-10"
                  >
                    <Link
                      to="/checkout"
                      data-testid="checkout-products"
                    >
                      Finalizar compra
                    </Link>
                  </button>
                </div>
              </div>
            )
        }

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
