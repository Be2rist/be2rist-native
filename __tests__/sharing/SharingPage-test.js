import 'react-native';
import React from 'react';
import SharingPage from 'components/sharing/SharingPage';
import renderer from 'react-test-renderer';

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

const wrapper = () => renderer.create(<SharingPage />);

describe('sharing page tests', () => {
  it('sharing page renders test', () => {
    expect(wrapper().toJSON()).toMatchSnapshot();
  });
});
