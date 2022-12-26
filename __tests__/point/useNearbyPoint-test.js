import useNearbyPoint from 'components/point/useNearbyPoint';
import {renderHook} from '@testing-library/react-native';
import {points} from '../../__mock-data__/point';
import {position} from '../../__mock-data__/position';

describe('useNearbyPoint hook tests', () => {
  it('nearest point not reached test', () => {
    const {result} = renderHook(() => useNearbyPoint(points, position, true));
    const expectedIndex = 2;
    const expectedNearbyPoint = points[expectedIndex];
    const expectedDistance = 216;
    const expectedReached = false;
    expect(result.current).toStrictEqual([
      expectedNearbyPoint,
      expectedDistance,
      expectedReached,
      expectedIndex,
    ]);
  });

  it('nearest point reached test', () => {
    const reachedPosition = {
      ...position,
      latitude: 54.3480313,
      longitude: 18.6557515,
    };
    const {result} = renderHook(() =>
      useNearbyPoint(points, reachedPosition, true),
    );
    const expectedIndex = 2;
    const expectedNearbyPoint = points[expectedIndex];
    const expectedDistance = 17;
    const expectedReached = true;
    expect(result.current).toStrictEqual([
      expectedNearbyPoint,
      expectedDistance,
      expectedReached,
      expectedIndex,
    ]);
  });

  it('gpsDisabled test', () => {
    const {result} = renderHook(() => useNearbyPoint(points, position, false));
    const expectedNearbyPoint = null;
    const expectedDistance = null;
    const expectedReached = false;
    const expectedIndex = null;
    expect(result.current).toStrictEqual([
      expectedNearbyPoint,
      expectedDistance,
      expectedReached,
      expectedIndex,
    ]);
  });
});
