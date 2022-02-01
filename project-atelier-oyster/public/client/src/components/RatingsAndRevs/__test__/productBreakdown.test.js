import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductBreakdown from '../productBreakdown.jsx';


//first tests
describe('Product Breakdown tests', () => {
  test('renders Product Breakdown component', () => {
    render(<ProductBreakdown />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

