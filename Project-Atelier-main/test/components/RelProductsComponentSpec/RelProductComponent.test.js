import React from 'react';

// Handles all main testing methods for the react testing library
import {render, waitFor, screen} from '@testing-library/react';

// Handles event handler testing
// Refer to https://testing-library.com/docs/ecosystem-user-event
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import App from '../../../client/src/app.jsx';
import RelProducts from '../../../client/src/components/RelProductsComponents/RelProducts.jsx';
import MyOutfitCards from '../../../client/src/components/RelProductsComponents/MyOutfitCards.jsx';
import ProductCards from '../../../client/src/components/RelProductsComponents/ProductCards.jsx';

// Handles Mock Server Setup
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from '../../mocks/handlers.js';
import { products as exampleProducts } from '../../../example/products.js';


// If only testing component functionality, the below mock server setup method can be used.

// MOCK SERVER SETUP - START ------------------>

// Setup a mock server with the handlers from the above import statement that sets up all server responses and requests
const server = setupServer(...handlers);

// OR set it up manually like below example:

/* const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  })
); */

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// MOCK SERVER SETUP - END ------------------>

describe('Related Products Component Testing', () => {
  test('Loads and displays a Related Products Component', async () => {
    // Renders a Component for this specific test
    // await render(<App />);
    await render(<RelProducts relatedProducts={exampleProducts} />);

    await waitFor(async () => {
      expect(await screen.getByText('Related Products and My Outfits')).toBeInTheDocument();
    });

    // Shows the HTML that has been rendered so far
    // This is utilized to check what has rendered so far, not exactly for the actual testing part
    // screen.debug();
  });
});

describe('Related Products Card Component Testing', () => {
  test('Loads and displays a Related Products Card', () => {
    render(<ProductCards productCards={exampleProducts} />);

    // FINDING ELEMENTS BY TEXT:

    // Since most of our data is in the form of dynamic elements such as 'text' strings,
    // we use the getByText() with the exact string that needs to be inside.

    // Matching a string:
    expect(screen.getByText('Jackets')).toBeInTheDocument(); // exact match
    expect(screen.getByText('ack', { exact: false })).toBeInTheDocument(); // substring match
    expect(screen.getByText('jackets', { exact: false })).toBeInTheDocument(); // ignore case

    // Matching a regex:
    expect(screen.getByText(/Jackets/)).toBeInTheDocument(); // substring match
    expect(screen.getByText(/jackets/i)).toBeInTheDocument(); // substring match, ignore case
    expect(screen.getByText(/^jackets$/i)).toBeInTheDocument(); // full string match, ignore case
    expect(screen.getByText(/Jacke?ts/i)).toBeInTheDocument(); // substring match, ignore case, searches for 'jackets' or 'ts'

    // toBeInTheDocument comes from the jest-dom library: https://github.com/testing-library/jest-dom
    // All the Jest-DOM functions are found in the above reference

    // Shows HTML of current render:
    // screen.debug();
  });

});

describe('My Outfits Card Component Testing', () => {
  test('Loads a My Outfit Card with correct category, name, and price', () => {
    render(<MyOutfitCards myOutfitCards={exampleProducts} />);

    // FINDING ELEMENTS BY ROLE:

    // getAllByRole outputs an array of elements that have the specified role
    // Since you cannot compare two HTML elements directly, we use 'toHaveTextContent'

    // Note: the 'getAll' prefix can be used with the getByText above as well

    // Refer to https://www.w3.org/TR/html-aria/#docconformance for how roles are allotted to different tags
    // ex: h1, h2, etc. have role = header, a with an href => role = link, button => role = button

    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Jackets');
    expect(screen.getAllByRole('heading')[2]).toHaveTextContent('Camo Onesie');
    expect(screen.getAllByRole('heading')[3]).toHaveTextContent('140');

    // getByRole tries to select a specific element with the specific role,
    // but specifying the 'name' or 'text' that is to be rendered inside the element
    // allows us to test the contents and validity of the element

    expect(screen.getByRole('heading', { name: 'Jackets' })).toHaveTextContent('Jackets');
    // screen.debug();
  });



});

// TESTING EVENT HANDLERS

// Example of utilizing userEvent
// Refer to https://testing-library.com/docs/ecosystem-user-event

test('click', () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>,
  );

  userEvent.click(screen.getByText('Check'));
  expect(screen.getByLabelText('Check')).toBeChecked();
});

// More queries to use can be found at https://testing-library.com/docs/queries/about
// Most others except the three above (getByText, getByRole, getByLabelText) are not used much and requires much setup on the front-end side.