import regeneratorRuntime from 'regenerator-runtime';
import products from '../../example/products.js';
import exampleQuestions from '../../example/questions.js';
import { rest } from 'msw';

export const handlers = [

  rest.get('/qna/getProductById', (req, res, ctx) => {
    return res(
      ctx.json({'id': 1,
        'name': 'Camo Onesie',
        'slogan': 'Blend in to your crowd',
        'description': 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
        'category': 'Jackets',
        'default_price': '140'}),
    );
  }),
  rest.get('/qna/getQuestionsList', (req, res, ctx) => {
    return res(
      ctx.json(exampleQuestions.questions));
  }),
];

