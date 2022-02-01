import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Question from '../Question.jsx';

describe('Question', () => {
  test('renders Question component', () => {
    render(<Question />);

    // expect (screen.getByText(/Overview/)).toBeInTheDocument();
  })
})