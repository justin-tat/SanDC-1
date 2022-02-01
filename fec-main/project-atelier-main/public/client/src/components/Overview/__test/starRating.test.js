import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from '../starRating.jsx';

describe('Star Rating', () => {
  test('renders Star Rating component', () => {
    render(<StarRating />);
  })
})