import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import ShoppingCart from './page/ShoppingCart';

class App extends React.Component {
  render() {
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
