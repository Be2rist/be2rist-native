import 'react-native';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import CloseButton from 'components/custom/CloseButton';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useNavigate: () => mockedUsedNavigate,
}));

it('close button test', () => {
  const {getByTestId} = render(<CloseButton path="/points" />);
  expect(screen.toJSON()).toMatchSnapshot();
  fireEvent.press(getByTestId('close-button'));
  expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  expect(mockedUsedNavigate).toHaveBeenCalledWith('/points');
});
