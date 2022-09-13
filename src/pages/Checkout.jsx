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
      <div>
        {cartList.map(({ id, title, price, qttd }) => (
          <div key={ id }>
            <h2>{title}</h2>
            <p>
              {`Quantidade: ${qttd}`}
            </p>
            <p>
              {`Preço unitário: ${price}`}
            </p>
          </div>
        ))}

        <h3>{cartTotal}</h3>

        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="fullname">
            Nome completo:
            <input
              data-testid="checkout-fullname"
              type="text"
              name="fullname"
              value={ fullname }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              data-testid="checkout-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              type="cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="phone">
            Telefone:
            <input
              data-testid="checkout-phone"
              type="phone"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="cep">
            CEP:
            <input
              data-testid="checkout-cep"
              type="cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="address">
            Endereço:
            <input
              data-testid="checkout-address"
              type="address"
              name="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>

          <div>
            Método de pagamento:
            <label htmlFor="ticket">
              <input
                type="radio"
                id="ticket"
                name="payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
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
              />
              Elo
            </label>
          </div>

          <button type="submit" data-testid="checkout-btn">Finalizar</button>
        </form>

        {!isValid && (<p data-testid="error-msg">Campos inválidos</p>)}
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: arrayOf(shape({})).isRequired,
  history: shape({}).isRequired,
};
