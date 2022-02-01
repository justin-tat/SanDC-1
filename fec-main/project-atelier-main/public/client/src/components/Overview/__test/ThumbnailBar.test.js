import {render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import ThumbnailBar from '../ThumbnailBar.jsx';

describe('Thumbnail Bar', () => {
  test('renders Thumbnail Bar component', () => {
    render(<ThumbnailBar />);
  })
})