import { rest } from 'msw';
import regeneratorRuntime from 'regenerator-runtime';
import { products, style } from '../../example/products.js';


export const handlers = [
  rest.get('http://localhost:3000/product/productInfo', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json(products)
    );
  }),

  rest.get('http://localhost:3000/product/styleInfo', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json(style)
    );
  }),
];
