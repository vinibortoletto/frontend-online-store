// Libs
import React from 'react';
import { string, number, shape, func } from 'prop-types';

// Components
import FeedbackForm from '../components/FeedbackForm';
import Feedback from '../components/Feedback';
import Loading from '../components/Loading';

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
    const {
      title,
      price,
      pictures,
      attributes,
    } = selectedProduct;
    const { feedbacks } = this.state;

    if (!pictures || pictures.length === 0) return <Loading />;

    return (
      <div className="px-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
          <div className="grid justify-items-center bg-white p-10 shadow md:self-start">
            <h2
              data-testid="product-detail-name"
              className="text-xl sm:text-2xl text-center font-bold mb-4"
            >
              {title}
            </h2>

            <img
              src={ pictures[0].url }
              alt={ title }
              data-testid="product-detail-image"
            />
          </div>

          <div>
            <h3
              className="text-center md:text-left mt-6 mb-4 font-bold text-xl"
            >
              Detalhes do produto
            </h3>

            <ul className="grid gap-2 px-4">
              {attributes.map((attribute) => (
                <li key={ attribute.id }>
                  <span className="">{`- ${attribute.name}: `}</span>
                  <span className="font-bold">{attribute.value_name}</span>
                </li>
              ))}
            </ul>

            <p
              data-testid="product-detail-price"
              className="text-center my-10 text-3xl font-bold text-blue-700"
            >
              {`R$${price}`}
            </p>

            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => addToCart(selectedProduct) }
              className="w-full bg-teal-400 text-slate-100 font-bold rounded p-2"
            >
              Adicionar ao Carrinho
            </button>
          </div>
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
