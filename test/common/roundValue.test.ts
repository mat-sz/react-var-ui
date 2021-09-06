import { roundValue } from '../../src/common/roundValue';

describe('roundValue', () => {
  it('returns input when no other arguments are specified', () => {
    expect(roundValue(5)).toBe(5);
    expect(roundValue(5.05)).toBe(5.05);
    expect(roundValue(0.33)).toBe(0.33);
  });

  it('clamps value to min', () => {
    expect(roundValue(5, 10)).toBe(10);
    expect(roundValue(11, 10)).toBe(11);
  });

  it('clamps value to max', () => {
    expect(roundValue(15, undefined, 10)).toBe(10);
    expect(roundValue(7, undefined, 10)).toBe(7);
  });

  it('clamps value to min and max', () => {
    expect(roundValue(15, 5, 10)).toBe(10);
    expect(roundValue(4, 5, 10)).toBe(5);
    expect(roundValue(7, 5, 10)).toBe(7);
  });

  it('rounds value to step', () => {
    expect(roundValue(20.5, undefined, undefined, 1)).toBe(21);
    expect(roundValue(20.4, undefined, undefined, 1)).toBe(20);
    expect(roundValue(21, undefined, undefined, 1)).toBe(21);
    expect(roundValue(20.00000005, undefined, undefined, 1)).toBe(20);
    expect(roundValue(20.00000005, undefined, undefined, 0.1)).toBe(20);
    expect(roundValue(20.05, undefined, undefined, 0.1)).toBe(20.1);
  });

  it('casts value to integer', () => {
    expect(roundValue(20.5, undefined, undefined, undefined, true)).toBe(21);
    expect(roundValue(20.1, undefined, undefined, undefined, true)).toBe(20);
  });

  it('clamps value to min and max and rounds value to step', () => {
    expect(roundValue(20.5, 19, 21, 0.1)).toBe(20.5);
    expect(roundValue(20.49, 19, 21, 0.1)).toBe(20.5);
    expect(roundValue(21.5, 19, 21, 0.1)).toBe(21);
    expect(roundValue(20.9, 19, 21, 0.1)).toBe(20.9);
    expect(roundValue(20.96, 19, 21, 0.1)).toBe(21);
  });

  it('handles NaN and Infinity correctly', () => {
    expect(roundValue(Infinity, 19, 21, 0.1)).toBe(19);
    expect(roundValue(NaN, 19, 21, 0.1)).toBe(19);
    expect(roundValue(Infinity, 19.01, 21, 0.1)).toBe(19);
    expect(roundValue(NaN, 19.01, 21, 0.1)).toBe(19);
    expect(roundValue(Infinity)).toBe(0);
    expect(roundValue(NaN)).toBe(0);
  });
});
