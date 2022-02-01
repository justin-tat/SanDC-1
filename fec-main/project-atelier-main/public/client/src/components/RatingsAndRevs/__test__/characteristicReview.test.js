import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import CharacteristicReview from '../characteristicReview.jsx';


//first tests
describe('Characteristic Review tests', () => {
  test('renders Characteristic Review component', () => {
    render(<CharacteristicReview />);

    // screen.debug();
    // const { getByTestId } = render(<RatingsAndReviews />);
    // const reviewsDiv = getByTestId('reviews')

    // expect(reviewsDiv.to.)
  });
})

