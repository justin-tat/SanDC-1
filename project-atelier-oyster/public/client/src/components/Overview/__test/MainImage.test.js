import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import MainImage from '../MainImage.jsx';

describe('Main Image', () => {
  test('renders Main Image component', () => {
    render(<MainImage />);
  })
})