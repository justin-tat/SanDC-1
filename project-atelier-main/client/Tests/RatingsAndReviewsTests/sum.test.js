const sum = require('./sum');

test('adds two numbers together', () => {
  expect(sum(1, 2)).toBe(3);
})