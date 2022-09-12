import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

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
          product: product.id,
          title: product.title,
          price: product.price,
          img: product.thumbnail,
          qttd: oldProduct.qttd + 1,
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
        },
      ];
    }

    this.setState({
      cartList: newCart,
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  render() {
    const { cartList, selectedProduct } = this.state;

    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home
              addToCart={ this.addToCart }
              getSelectedProduct={ this.getSelectedProduct }
            />
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart cartList={ cartList } />
          </Route>
          <Route
            exact
            path="/product-details"
            render={ () => (<ProductDetails
              selectedProduct={ selectedProduct }
              addToCart={ this.addToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
