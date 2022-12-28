import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {points} from '../../__mock-data__/point';
import MediaResolver from 'components/player/MediaResolver';

const DEFAULT_PROPS = {
  point: points[0],
  close: jest.fn,
};

describe('media resolver tests', () => {
  it('audi player renders test', () => {
    render(<MediaResolver {...DEFAULT_PROPS} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
