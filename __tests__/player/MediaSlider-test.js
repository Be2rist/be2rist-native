import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MediaSlider from 'components/player/MediaSlider';

const DEFAULT_PROPS = {
  onSliderEditStart: jest.fn(),
  onSliderEditEnd: jest.fn(),
  onSliderEditing: jest.fn(),
  playSeconds: 1,
  duration: 150,
};

const createRenderer = props =>
  renderer.create(<MediaSlider {...props} />).toJSON();

describe('media slider tests', () => {
  it('media slider renders test', () => {
    const slider = createRenderer(DEFAULT_PROPS);
    expect(slider).toMatchSnapshot();
  });
});
