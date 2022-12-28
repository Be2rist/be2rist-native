import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import {View} from 'react-native';

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

it('background scroll view dark mode test', () => {
  render(
    <BackgroundScrollView>
      <View />
    </BackgroundScrollView>,
  );
  expect(screen.toJSON()).toMatchSnapshot();
});
