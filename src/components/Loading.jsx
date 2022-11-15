// Libs
import React from 'react';

// Images
import loadingGif from '../assets/loading.webp';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="flex justify-center mt-32">
        <img
          className="w-32"
          src={ loadingGif }
          alt="animação de um carrinho de compras"
        />
      </div>
    );
  }
}
