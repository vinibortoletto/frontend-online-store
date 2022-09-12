import React from 'react';
import { arrayOf, shape } from 'prop-types';

export default class Feedback extends React.Component {
  render() {
    const { feedbacks } = this.props;
    return (
      <div>
        {
          feedbacks
            .map(({ email, text, rating }, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{email}</p>
                <p data-testid="review-card-rating">{rating}</p>
                <p data-testid="review-card-evaluation">{text}</p>
              </div>
            ))
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  feedbacks: arrayOf(shape({})).isRequired,
};
