import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import StyleSelector from '../StyleSelector.jsx';

describe('StyleSelector', () => {
  test('renders Style Selector component', () => {
    render(<StyleSelector />);
  })
})