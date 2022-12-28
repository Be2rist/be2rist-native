import 'react-native';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {points} from '../../__mock-data__/point';
import NewMarkers from 'components/custom/NewMarkers';

const setPointMock = jest.fn();

it('new marker test', () => {
  const {getByTestId} = render(
    <NewMarkers points={points} setPoint={setPointMock} />,
  );
  expect(screen.toJSON()).toMatchSnapshot();
  fireEvent.press(getByTestId(`new-marker-${points[0].id}`));
  expect(setPointMock).toHaveBeenCalledTimes(1);
  expect(setPointMock).toHaveBeenCalledWith(points[0]);
});
