import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import SizeSelector from '../SizeSelector.jsx';

describe('Size Selector', () => {
  test('renders Size Selector component', () => {
    render(<SizeSelector />);
  })
})