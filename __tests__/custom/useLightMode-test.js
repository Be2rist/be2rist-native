import {renderHook} from '@testing-library/react-native';
import useDarkMode from 'components/custom/useDarkMode';

it('light mode test', () => {
  const {result} = renderHook(() => useDarkMode());
  expect(result.current).toBe(false);
});
