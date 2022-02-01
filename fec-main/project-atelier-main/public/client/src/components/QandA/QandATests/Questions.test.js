import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Questions from '../Questions.jsx';

describe('Questions', () => {
  test('renders Questions component', () => {
    render(<Questions />);

    // expect (screen.getByText(/Overview/)).toBeInTheDocument();
  })
})