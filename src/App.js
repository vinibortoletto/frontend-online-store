import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as api from './services/api';
import Home from './components/Home';

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
        <Switch>
          <Route exect path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
