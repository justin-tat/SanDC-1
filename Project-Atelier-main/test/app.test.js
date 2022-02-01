import React from 'react';

// Handles all main testing methods for the react testing library
import {render, waitFor, screen} from '@testing-library/react';

// Handles event handler testing
// Refer to https://testing-library.com/docs/ecosystem-user-event
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import App from '../client/src/app';
import RelProducts from '../client/src/components/RelProductsComponents/RelProducts.jsx';

// Handles Mock Server Setup
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from './mocks/handlers.js';
import { handlers as qnaHandlers } from './mocks/qnaHandlers.js';
import { products as exampleProducts } from '../example/products.js';

const server = setupServer(...handlers, ...qnaHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('App should display', () => {
  // render(<App />);
});