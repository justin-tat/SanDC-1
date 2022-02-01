import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../Overview.jsx';

describe('Overview', () => {
  test('renders Overview component', () => {
    render(<Overview />);

    // expect (screen.getByText(/Overview/)).toBeInTheDocument();
  })
})