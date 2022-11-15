// Libs
import React from 'react';
import { arrayOf, shape } from 'prop-types';

export default class Feedback extends React.Component {
  render() {
    const { feedbacks } = this.props;
    return (
      <div className="grid gap-4 md:max-w-3xl md:mx-auto">
        {feedbacks
          .map(({ email, text, rating }, index) => (
            <div
              key={ index }
              className="bg-white shadow py-4 px-10 text-left"
            >
              <div className="flex gap-4">
                <p
                  data-testid="review-card-email"
                  className="font-bold"
                >
                  {email}
                </p>
                <p data-testid="review-card-rating">{`Avaliação: ${rating}/5`}</p>
              </div>

              <p data-testid="review-card-evaluation">{text}</p>
            </div>
          ))}
      </div>
    );
  }
}

Feedback.propTypes = {
  feedbacks: arrayOf(shape({})).isRequired,
};
