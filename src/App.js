import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import { getProductById } from './services/api';
import Checkout from './pages/Checkout';

class App extends React.Component {
  state = {
    cartList: [],
    selectedProduct: {},
  };

  componentDidMount() {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart) {
      this.setState({ cartList: localCart });
    }
  }

  fetchSelectedProduct = async (productId) => {
    const selectedProduct = await getProductById(productId);
    this.setState({ selectedProduct });
    return selectedProduct;
  };

  getSelectedProduct = (product) => {
    this.setState({ selectedProduct: product });
  };

  addToCart = (product) => {
    const { cartList } = this.state;

    let newCart = cartList;

    const oldProduct = cartList.find((v) => v.id === product.id);
    if (oldProduct) {
      const semProduto = cartList.filter((v) => v.id !== product.id);
      newCart = [
        ...semProduto,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.thumbnail,
          qttd: oldProduct.qttd + 1,
          availableQttd: product.available_quantity,
        },
      ];
    } else {
      newCart = [
        ...cartList,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.thumbnail,
          qttd: 1,
          availableQttd: product.available_quantity,
        },
      ];
    }

    this.setState({
      cartList: [...newCart],
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  increaseItens = async (valor) => {
    const { cartList } = this.state;

    let newItem = cartList;

    const {
      id,
      title,
      price,
      thumbnail,
      qttd,
      availableQttd,
    } = cartList.find((v) => v.id === valor);
    const semProduto = cartList.filter((v) => v.id !== valor);

    newItem = [
      ...semProduto,
      {
        id,
        title,
        price,
        img: thumbnail,
        qttd: (qttd + 1 <= availableQttd) ? qttd + 1 : qttd,
        availableQttd,
      },
    ];

    this.setState({
      cartList: newItem,
    });
    localStorage.setItem('cart', JSON.stringify(newItem));
  };

  decreaseItens = (valor) => {
    const { cartList } = this.state;

    let newItem = cartList;

    const product = cartList.find((v) => v.id === valor);
    if (product.qttd > 1) {
      const semProduto = cartList.filter((v) => v.id !== valor);
      newItem = [
        ...semProduto,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.thumbnail,
          qttd: product.qttd - 1,
          availableQttd: product.availableQttd,
        },
      ];
      this.setState({
        cartList: newItem,
      });
      localStorage.setItem('cart', JSON.stringify(newItem));
    } else {
      this.deleteItens(valor);
    }
  };

  deleteItens = (valor) => {
    const { cartList } = this.state;

    const semProduto = cartList.filter((v) => v.id !== valor);

    this.setState({
      cartList: semProduto,
    });
    localStorage.setItem('cart', JSON.stringify(semProduto));
  };

  render() {
    const { cartList, selectedProduct } = this.state;

    return (
      <BrowserRouter>
        <Header cartList={ cartList } />

        <Switch>
          <Route exact path="/">
            <Home
              addToCart={ this.addToCart }
              getSelectedProduct={ this.getSelectedProduct }
            />
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart
              cartList={ cartList }
              increaseItens={ this.increaseItens }
              decreaseItens={ this.decreaseItens }
              deleteItens={ this.deleteItens }
            />
          </Route>
          <Route
            exact
            path="/product-details/:productId"
            render={ (props) => (<ProductDetails
              { ...props }
              selectedProduct={ selectedProduct }
              addToCart={ this.addToCart }
              fetchSelectedProduct={ this.fetchSelectedProduct }
            />) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => <Checkout { ...props } cartList={ cartList } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
