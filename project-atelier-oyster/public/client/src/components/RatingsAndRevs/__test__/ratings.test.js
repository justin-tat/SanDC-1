import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import RatingsAndReviews from '../RatingsAndReviews.jsx';


//first tests
describe('Ratings and Reviews tests', () => {
  test('renders App component', () => {
    render(<RatingsAndReviews />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

