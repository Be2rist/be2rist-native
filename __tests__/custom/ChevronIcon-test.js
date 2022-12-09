import 'react-native';
import React from 'react';
import ChevronIcon from 'components/custom/ChevronIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('chevron renders correctly', () => {
  const chevron = renderer.create(<ChevronIcon />).toJSON();
  expect(chevron).toMatchSnapshot();
});
