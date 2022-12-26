import 'react-native';
import React from 'react';
import SharingPage from 'components/sharing/SharingPage';
import {render, screen} from '@testing-library/react-native';

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useLocation: () => ({pathname: '/sharing/points'}),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => {
  const ActualRedux = jest.requireActual('react-redux');
  return {
    ...ActualRedux,
    useSelector: () => ({list: [], loading: false}),
  };
});

describe('sharing page tests', () => {
  it('sharing page renders test', () => {
    render(<SharingPage />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
