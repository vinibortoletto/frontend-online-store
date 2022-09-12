import React from 'react';
import { string, number, shape, func } from 'prop-types';
import FeedbackForm from '../components/FeedbackForm';
import Feedback from '../components/Feedback';

export default class ProductDetails extends React.Component {
  state = {
    feedbacks: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { productId },
      },
      fetchSelectedProduct,
    } = this.props;

    const selectedProduct = await fetchSelectedProduct(productId);
    this.getLocalFeedbacks(selectedProduct);
  }

  getLocalFeedbacks = (selectedProduct) => {
    const localFeedbacks = JSON.parse(localStorage.getItem(`${selectedProduct.id}`));
    if (localFeedbacks) this.setState({ feedbacks: [...localFeedbacks] });
  };

  render() {
    const {
      selectedProduct,
      addToCart,
    } = this.props;
    const { thumbnail, title, price } = selectedProduct;
    const { feedbacks } = this.state;

    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          <p data-testid="product-detail-name">{title}</p>
          <p data-testid="product-detail-price">{price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addToCart(selectedProduct) }
          >
            Adicionar ao Carrinho
          </button>
        </div>

        <FeedbackForm
          selectedProduct={ selectedProduct }
          feedbacks={ feedbacks }
          getLocalFeedbacks={ this.getLocalFeedbacks }
        />

        <Feedback
          feedbacks={ feedbacks }
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addToCart: func.isRequired,
  selectedProduct: shape({
    thumbnail: string,
    title: string,
    price: number,
  }).isRequired,
  match: shape({}).isRequired,
  fetchSelectedProduct: func.isRequired,
};
