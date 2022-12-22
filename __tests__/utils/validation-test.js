import {required} from 'utils/validation';

describe('validation tests', () => {
  it('test require', () => {
    expect(required()).toBe('validation.required');
    expect(required(' ')).toBe('validation.required');
    expect(required([])).toBe('validation.required');
    expect(required('value')).toBeUndefined();
    expect(required([1])).toBeUndefined();
  });
});
