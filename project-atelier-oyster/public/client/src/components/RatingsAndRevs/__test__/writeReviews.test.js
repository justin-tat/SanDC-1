import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import WriteReview from '../writeReview.jsx';


//first tests
describe(' Write Review tests', () => {
  test('renders Write Review component', () => {
    render(<WriteReview />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

