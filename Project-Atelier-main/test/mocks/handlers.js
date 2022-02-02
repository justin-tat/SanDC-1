import { rest } from 'msw';
import {dummyReviews} from '../../example/reviews.js';
import regeneratorRuntime from 'regenerator-runtime';
import { products } from '../../example/products.js';


// Create your own js file with these handlers or mock server responses containing example data within this mocks folder if needed

// Looks very similar to regular server expressions, but 'ctx' is used to handle response handlers instead of res.
export const handlers = [
  rest.get('/product/related_products', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json(products)
    );
  }),

  rest.get('/ratings/getReviews', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dummyReviews.results)
    );
  }),
  rest.get('/ratings/ratingOverview', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dummyReviews.meta)
    );
  }),
  rest.post('/ratings/updateHelpfulness', (req, res, ctx) => {
    return res(
      ctx.status(201),
    );
  }),
  rest.post('https://api.cloudinary.com/v1_1/dqidinkkf/upload', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({'data': {'secure_url': 'https://res.cloudinary.com/dqidinkkf/image/upload/v1641767630/plv1j7hjp5ajpsdrtkmu.jpg'}})
    );
  }),
  rest.get('/qna', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
];