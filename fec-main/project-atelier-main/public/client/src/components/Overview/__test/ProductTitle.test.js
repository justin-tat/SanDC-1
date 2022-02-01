import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductTitle from '../ProductTitle.jsx';

describe('Product Title', () => {
  test('renders Product Title component', () => {
    render(<ProductTitle />);
  })
})