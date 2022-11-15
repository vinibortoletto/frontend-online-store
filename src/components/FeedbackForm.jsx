// Libs
import React from 'react';
import { shape, arrayOf, func } from 'prop-types';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

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

    const ratingFields = [ONE, TWO, THREE, FOUR, FIVE];

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
          className="my-10 md:max-w-3xl md:mx-auto"
        >
          <h3 className="font-bold text-xl text-center mb-4">Avaliações</h3>

          <div className="grid gap-4">
            <label htmlFor="feedbackEmail">
              <span className="absolute -left-full">Email</span>
              <input
                type="email"
                id="feedbackEmail"
                name="feedbackEmail"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
                value={ feedbackEmail }
                placeholder="Email"
                className="border p-2 w-full mb-2"
              />
            </label>

            <div className="flex gap-2 justify-center">
              {ratingFields.map((field) => (
                <label htmlFor={ field } key={ field }>
                  <input
                    type="radio"
                    name="feedbackRating"
                    id={ field }
                    data-testid={ `${field}-rating` }
                    onChange={ this.handleChange }
                    className="mr-1"
                  />
                  {field}
                </label>
              ))}
            </div>

            <textarea
              name="feedbackEvaluation"
              id=""
              cols="30"
              rows="10"
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
              value={ feedbackEvaluation }
              className="border p-2 w-full mb-2"
              placeholder="Comentários"
            />

            <button
              type="submit"
              data-testid="submit-review-btn"
              className="w-full bg-teal-400 text-slate-100 font-bold rounded p-2"
            >
              Enviar
            </button>
          </div>
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
