import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import AddToCart from '../AddToCart.jsx';

describe('Add To Cart', () => {
  test('renders Add To Cart component', () => {
    render(<AddToCart />);
  })
})