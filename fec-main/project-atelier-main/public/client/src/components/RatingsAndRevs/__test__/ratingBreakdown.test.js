import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import RatingBreakdown from '../ratingBreakdown.jsx';


//first tests
describe('Rating Breakdown tests', () => {
  test('renders Rating Breakdown component', () => {
    render(<RatingBreakdown />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

