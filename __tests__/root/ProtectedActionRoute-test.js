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
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  const ActualRedux = jest.requireActual('react-redux');
  return {
    ...ActualRedux,
    useDispatch: () => mockDispatch,
    useSelector: () => ({list: [], loading: false}),
  };
});

const mockAction = jest.fn();

const route = {
  path: '/points',
  element: <Text testID="test-element">test</Text>,
  unAuthenticated: true,
  actions: [mockAction],
};

describe('protected action route component tests', () => {
  afterEach(() => {
    mockDispatch.mockReset();
  });

  it('unAuthenticated route test', () => {
    render(<ProtectedActionRoute route={route} />);
    expect(screen.getByTestId('test-element')).toBeTruthy();
    expect(mockAction).toHaveBeenCalledWith({
      id: 'id1',
      language: 'en',
      languages: 'en',
      radius: '20',
    });
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('unAuthenticated route test without actions', () => {
    const routeWithoutActions = {...route, actions: undefined};
    render(<ProtectedActionRoute route={routeWithoutActions} />);
    expect(screen.getByTestId('test-element')).toBeTruthy();
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
