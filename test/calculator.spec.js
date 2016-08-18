// External
import { expect } from 'chai';

// Internal
import Calculator from '../lib/calculator';

// Example test with a simple class
describe('Calculator', () => {
  it('should sum 1 + 2 to equal 3', () => {
    const calc = new Calculator();
    expect(calc.sum(1, 2)).to.be.equal(3);
  });
});
