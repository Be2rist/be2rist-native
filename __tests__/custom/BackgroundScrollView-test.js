import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import {View} from 'react-native';

it('background scroll view test', () => {
  render(
    <BackgroundScrollView>
      <View />
    </BackgroundScrollView>,
  );
  expect(screen.toJSON()).toMatchSnapshot();
});
