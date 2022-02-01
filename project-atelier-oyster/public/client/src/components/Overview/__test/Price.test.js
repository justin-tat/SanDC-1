import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Price from '../Price.jsx';

describe('Price', () => {
  test('renders Price component', () => {
    render(<Price />);
  })
})