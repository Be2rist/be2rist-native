import {renderHook} from '@testing-library/react-native';
import useDarkMode from 'components/custom/useDarkMode';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      settings: {
        theme: 'dark',
      },
    }),
  };
});

it('dark mode test', () => {
  const {result} = renderHook(() => useDarkMode());
  expect(result.current).toBe(true);
});
