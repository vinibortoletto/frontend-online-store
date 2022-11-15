/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */

// Libs
import React from 'react';
import { arrayOf, shape } from 'prop-types';

export default class Checkout extends React.Component {
  state = {
    cartTotal: 0,
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isValid: true,
  };

  componentDidMount() {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    this.calculateCart(localCart);
  }

  calculateCart = (cartList) => {
    this.setState({
      cartTotal: cartList.reduce((acc, { price, qttd }) => qttd * price, 0),
    });
  };

  handleChange = ({ target }) => {
    const { type, name, id, value } = target;
    this.setState({ [name]: type === 'radio' ? id : value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;

    const { history } = this.props;

    const formIsValid = (
      (fullname !== '')
      && (email !== '')
      && (cpf !== '')
      && (phone !== '')
      && (cep !== '')
      && (address !== '')
      && (payment !== '')
    );

    this.setState({ isValid: formIsValid });

    if (formIsValid) {
      this.setState({
        fullname: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
      });

      localStorage.setItem('cart', JSON.stringify([]));

      history.push('/');
    }
  };

  render() {
    const { cartList } = this.props;
    const {
      cartTotal,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      isValid,
    } = this.state;

    return (
      <div className="px-4 md:flex md:gap-10 md:max-w-5xl md:mx-auto">

        <ul className="flex flex-col gap-4 text-center md:text-left">
          {cartList.map(({ id, title, price, qttd }) => (
            <li
              key={ id }
              className="bg-white p-6 shadow grid gap-2 md:h-40"
            >
              <h2 className="font-bold">{title}</h2>
              <p>
                {`Quantidade: ${qttd}`}
              </p>
              <p>
                {`Preço unitário: R$${price}`}
              </p>
            </li>
          ))}
        </ul>

        <form
          onSubmit={ this.handleSubmit }
          className="md:w-96 md:mx-auto"
        >
          <h3 className="font-bold text-center text-xl mt-10 md:mt-0 mb-4">
            Informações
          </h3>

          <label htmlFor="fullname">
            <span className="absolute -left-full">Nome completo:</span>
            <input
              data-testid="checkout-fullname"
              type="text"
              name="fullname"
              value={ fullname }
              onChange={ this.handleChange }
              placeholder="Nome completo"
              className="border p-2 w-full mb-2"
            />
          </label>

          <label htmlFor="email">
            <span className="absolute -left-full">Email:</span>
            <input
              data-testid="checkout-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Email"
              className="border p-2 w-full mb-2"
            />
          </label>

          <label htmlFor="cpf">
            <span className="absolute -left-full">CPF:</span>
            <input
              data-testid="checkout-cpf"
              type="cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
              placeholder="CPF"
              className="border p-2 w-full mb-2"
            />
          </label>

          <label htmlFor="phone">
            <span className="absolute -left-full">Telefone:</span>
            <input
              data-testid="checkout-phone"
              type="phone"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
              placeholder="Telefone"
              className="border p-2 w-full mb-2"
            />
          </label>

          <label htmlFor="cep">
            <span className="absolute -left-full">CEP:</span>
            <input
              data-testid="checkout-cep"
              type="cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
              placeholder="CEP"
              className="border p-2 w-full mb-2"
            />
          </label>

          <label htmlFor="address">
            <span className="absolute -left-full">Endereço:</span>
            <input
              data-testid="checkout-address"
              type="address"
              name="address"
              value={ address }
              onChange={ this.handleChange }
              placeholder="Endereço"
              className="border p-2 w-full mb-2"
            />
          </label>

          <div>
            <h3 className="font-bold text-center text-xl mt-10 mb-4">
              Método de pagamento
            </h3>

            <div className="flex justify-center gap-2">
              <label htmlFor="ticket">
                <input
                  type="radio"
                  id="ticket"
                  name="payment"
                  data-testid="ticket-payment"
                  onChange={ this.handleChange }
                  className="mr-1"
                />
                Boleto
              </label>

              <label htmlFor="visa">
                <input
                  type="radio"
                  id="visa"
                  name="payment"
                  data-testid="visa-payment"
                  onChange={ this.handleChange }
                  className="mr-1"
                />
                Visa
              </label>

              <label htmlFor="master">
                <input
                  type="radio"
                  id="master"
                  name="payment"
                  data-testid="master-payment"
                  onChange={ this.handleChange }
                  className="mr-1"
                />
                MasterCard
              </label>

              <label htmlFor="elo">
                <input
                  type="radio"
                  id="elo"
                  name="payment"
                  data-testid="elo-payment"
                  onChange={ this.handleChange }
                  className="mr-1"
                />
                Elo
              </label>
            </div>
          </div>

          <h3 className="font-bold text-3xl text-blue-700 text-center my-10">
            {`Subtotal: R$${cartTotal}`}
          </h3>

          <button
            type="submit"
            data-testid="checkout-btn"
            className="w-full bg-teal-400 text-slate-100 font-bold rounded p-2"
          >
            Finalizar
          </button>

          {!isValid && (
            <p
              data-testid="error-msg"
              className="text-red-700 italic"
            >
              Campos inválidos
            </p>
          )}
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: arrayOf(shape({})).isRequired,
  history: shape({}).isRequired,
};
