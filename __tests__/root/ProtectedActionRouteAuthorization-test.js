import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProtectedActionRoute from 'components/root/ProtectedActionRoute';
import {Text} from 'react-native';

jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useParams: () => ({id: 'id1'}),
  useLocation: () => ({
    pathname: '/points',
    search: '?radius=20&languages=en',
  }),
  useNavigate: () => jest.fn(),
  Navigate: () => null,
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  const ActualRedux = jest.requireActual('react-redux');
  return {
    ...ActualRedux,
    useDispatch: () => mockDispatch,
    useSelector: () => undefined,
  };
});

const mockAction = jest.fn();

const route = {
  path: '/points',
  element: <Text testID="test-element">test</Text>,
  unAuthenticated: true,
  actions: [mockAction],
};

describe('protected action route authentication component tests', () => {
  it('authenticated route test without user', () => {
    const authRoute = {...route, unAuthenticated: false};
    render(<ProtectedActionRoute route={authRoute} />);
    expect(screen.queryByTestId('test-element')).toBeNull();
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
