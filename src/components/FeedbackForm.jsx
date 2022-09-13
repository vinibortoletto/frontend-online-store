import React from 'react';
import { shape, arrayOf, func } from 'prop-types';

export default class FeedbackForm extends React.Component {
  state = {
    feedbackEmail: '',
    feedbackRating: '',
    feedbackEvaluation: '',
    isValid: true,
  };

  handleChange = ({ target }) => {
    const { type, name, id, value } = target;
    this.setState({ [name]: type === 'radio' ? id : value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      selectedProduct,
      feedbacks,
      getLocalFeedbacks,
    } = this.props;

    const {
      feedbackEmail,
      feedbackRating,
      feedbackEvaluation,
    } = this.state;

    if (feedbackEmail !== '' && feedbackRating !== '') {
      const feedbackObject = {
        email: feedbackEmail,
        text: feedbackEvaluation,
        rating: feedbackRating,
      };

      const newFeedbacks = [...feedbacks, feedbackObject];
      localStorage.setItem(`${selectedProduct.id}`, JSON.stringify(newFeedbacks));

      this.setState({
        feedbackEmail: '',
        feedbackRating: '',
        feedbackEvaluation: '',
        isValid: true,
      });

      getLocalFeedbacks(selectedProduct);
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const {
      feedbackEmail,
      feedbackEvaluation,
      isValid,
    } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="feedbackEmail">
            <input
              type="email"
              id="feedbackEmail"
              name="feedbackEmail"
              data-testid="product-detail-email"
              onChange={ this.handleChange }
              value={ feedbackEmail }
            />
          </label>

          <label htmlFor="1">
            <input
              type="radio"
              name="feedbackRating"
              id="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
            />
            1
          </label>

          <label htmlFor="2">
            <input
              type="radio"
              name="feedbackRating"
              id="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
            2
          </label>

          <label htmlFor="3">
            <input
              type="radio"
              name="feedbackRating"
              id="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
            3
          </label>

          <label htmlFor="4">
            <input
              type="radio"
              name="feedbackRating"
              id="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />
            4
          </label>

          <label htmlFor="5">
            <input
              type="radio"
              name="feedbackRating"
              id="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />
            5
          </label>

          <textarea
            name="feedbackEvaluation"
            id=""
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            value={ feedbackEvaluation }
          />

          <button type="submit" data-testid="submit-review-btn">Enviar</button>
        </form>

        {!isValid && (<p data-testid="error-msg">Campos inválidos</p>)}
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  selectedProduct: shape({}).isRequired,
  feedbacks: arrayOf(shape({})).isRequired,
  getLocalFeedbacks: func.isRequired,
};
