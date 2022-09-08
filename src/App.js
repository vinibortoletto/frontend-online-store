import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as api from './services/api';
import Home from './components/Home';
import Header from './components/Header';
import ShoppingCart from './page/ShoppingCart';

class App extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    this.setState({
      categories: await api.getCategories(),
    });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);

    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
