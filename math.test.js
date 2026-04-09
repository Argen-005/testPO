const { add, subtract } = require('./math');

describe('Математические функции', () => {
  test('add складывает два числа', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('subtract вычитает второе число из первого', () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(5, 10)).toBe(-5);
  });
});