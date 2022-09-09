import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  state = {
    cartList: [],
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
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home addToCart={ this.addToCart } />
          </Route>
          <Route exact path="/shoppingcart">
            <ShoppingCart cartList={ cartList } />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
