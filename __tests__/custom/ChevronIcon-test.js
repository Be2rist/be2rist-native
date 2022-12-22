import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChevronIcon from 'components/custom/ChevronIcon';

it('chevron renders correctly', () => {
  const chevron = renderer.create(<ChevronIcon />).toJSON();
  expect(chevron).toMatchSnapshot();
});
