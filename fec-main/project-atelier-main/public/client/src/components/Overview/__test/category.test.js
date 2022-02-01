import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Category from '../Category.jsx';

describe('Category', () => {
  test('renders Category component', () => {
    render(<Category />);

    // expect (screen.getByText(/Overview/)).toBeInTheDocument();
  })
})