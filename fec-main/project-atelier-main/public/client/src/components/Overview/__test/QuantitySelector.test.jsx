import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import QuantitySelector from '../QuantitySelector.jsx';

describe('Quantity Selector', () => {
  test('renders Quantity Selector component', () => {
    render(<QuantitySelector />);
  })
})