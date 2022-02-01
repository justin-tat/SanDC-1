import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from '../reviews.jsx';


//first tests
describe('Reviews tests', () => {
  test('renders Reviews component', () => {
    render(<Reviews />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

