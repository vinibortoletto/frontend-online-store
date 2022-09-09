import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  state = {
    selectedProduct: {},
  };

  getSelectedProduct = (product) => {
    this.setState({ selectedProduct: product });
  };

  render() {
    const { selectedProduct } = this.state;

    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home getSelectedProduct={ this.getSelectedProduct } /> }
          />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route
            exact
            path="/product-details"
            render={ () => <ProductDetails selectedProduct={ selectedProduct } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
