import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TextError from 'components/form/TextError';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const prepare = props => renderer.create(<TextError {...props} />).toJSON();

describe('text error tests', () => {
  it('test error not renders with no error', () => {
    const testError = prepare();
    expect(testError).toBeNull();
  });

  it('test error not renders when untouched', () => {
    const testError = prepare({error: 'error'});
    expect(testError).toBeNull();
  });

  it('test error renders when touched and error message', () => {
    const testError = prepare({error: 'error', touched: true});
    expect(testError).toMatchSnapshot();
  });
});
