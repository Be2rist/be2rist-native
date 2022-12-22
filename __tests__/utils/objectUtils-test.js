import {isEmpty} from 'utils/objectUtils';

describe('object utils tests', () => {
  it('test is empty', () => {
    expect(isEmpty()).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({test: 'test'})).toBe(false);
  });
});
