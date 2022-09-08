import React, { Component } from 'react';

class Home extends Component {
  state = {
    productList: [],
  };

  render() {
    const { productList } = this.state;
    const validationInitialMessage = productList.length === 0;
    const initialMessage = 'Digite algum termo de pesquisa ou escolha uma categoria.';

    return (
      <div>
        { validationInitialMessage
        && (<h2 data-testid="home-initial-message">{ initialMessage }</h2>) }
      </div>
    );
  }
}

export default Home;
