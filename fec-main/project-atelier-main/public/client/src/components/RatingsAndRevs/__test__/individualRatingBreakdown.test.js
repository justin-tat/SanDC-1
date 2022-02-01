import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import IndividualRatingBreakdown from '../individualRatingBreakdown.jsx';


//first tests
describe('Individual Rating Breakdown tests', () => {
  test('renders Individual Rating Breakdown component', () => {
    render(<IndividualRatingBreakdown />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

