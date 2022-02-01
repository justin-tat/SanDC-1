import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import QandA from '../QandA.jsx';

describe('QandA', () => {
  test('renders QandA component', () => {
    render(<QandA />);

    // expect (screen.getByText(/Overview/)).toBeInTheDocument();
  })
})