import 'react-native';
import React from 'react';
import {points} from '../../__mock-data__/point';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react-native';
import AudioPlayer from 'components/player/AudioPlayer';
import Sound from 'react-native-sound';

const DEFAULT_PROPS = {
  point: points[2],
  close: jest.fn(),
  showPrevious: jest.fn(),
  showNext: jest.fn(),
  isLast: false,
  disablePointControls: true,
  isFirst: false,
};

describe('audio player tests', () => {
  it('audio player renders correctly', () => {
    render(<AudioPlayer {...DEFAULT_PROPS} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('loading sound test', () => {
    render(<AudioPlayer {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('sound-loading')).toBeTruthy();
    expect(screen.getByTestId('close-button')).toBeTruthy();
    // check audio url
    expect(Sound.DOCUMENT).toBe(
      'https://docs.google.com/uc?export=download&id=1SPT9SwLvr89EFdxydfZ7yQ4d_jEE9yvd',
    );
  });

  it('loaded sound test', async () => {
    const {queryByTestId, getByTestId} = render(
      <AudioPlayer {...DEFAULT_PROPS} />,
    );
    await act(async () => {
      Sound.callback();
      Sound.loaded = true;
      // check hidden sound loading indicator after loading
      await waitFor(() => expect(queryByTestId('sound-loading')).toBeNull());
      await waitFor(() => expect(queryByTestId('play-button')).toBeNull());
      // check sound play function has been called
      expect(Sound.playMock).toHaveBeenCalledTimes(1);
      fireEvent.press(getByTestId('touchable-player'));
      // check play button displays on touch screen
      await waitFor(() => expect(queryByTestId('play-button')).toBeTruthy());
      expect(Sound.pauseMock).toHaveBeenCalledTimes(1);
      // play again test
      fireEvent.press(getByTestId('touchable-player'));
      await waitFor(() => expect(queryByTestId('play-button')).toBeNull());
      expect(Sound.playMock).toHaveBeenCalledTimes(2);
      fireEvent.press(screen.getByTestId('close-button'));
      expect(Sound.releaseMock).toHaveBeenCalledTimes(2);
      expect(DEFAULT_PROPS.close).toHaveBeenCalledTimes(1);
    });
  });

  it('error loading sound test', async () => {
    const {queryByTestId} = render(<AudioPlayer {...DEFAULT_PROPS} />);
    await act(async () => {
      Sound.callback('error');
      Sound.loaded = true;
      // check hidden sound loading indicator after loading
      await waitFor(() => expect(queryByTestId('sound-loading')).toBeNull());
      await waitFor(() => expect(queryByTestId('play-button')).toBeTruthy());
    });
  });

  it('image collage test', async () => {
    const {queryByTestId} = render(<AudioPlayer {...DEFAULT_PROPS} />);
    await act(async () => {
      Sound.callback();
      Sound.loaded = true;
      expect(queryByTestId('background').props.source).toStrictEqual({
        uri: 'https://drive.google.com/uc?export=view&id=1Dr1ml2-GZcA5zyf68VmiFudFAoyCu9eb',
      });
      Sound.currentTime = 20;
      await waitFor(() =>
        expect(queryByTestId('background').props.source).toStrictEqual({
          uri: 'https://drive.google.com/uc?export=view&id=1JXNtJrUOfYppjEpzIBgQ7EWTs31Bs-Dy',
        }),
      );
    });
  });

  it('point navigation button test', async () => {
    const {queryByTestId, getByTestId} = render(
      <AudioPlayer {...DEFAULT_PROPS} disablePointControls={false} />,
    );
    await act(async () => {
      Sound.callback();
      Sound.loaded = true;
      await waitFor(() => expect(queryByTestId('sound-loading')).toBeNull());
      await waitFor(() => expect(queryByTestId('play-button')).toBeNull());
      fireEvent.press(getByTestId('touchable-player'));
      await waitFor(() =>
        expect(queryByTestId('previous-button')).toBeTruthy(),
      );
      fireEvent.press(queryByTestId('previous-button'));
      expect(Sound.releaseMock).toHaveBeenCalledTimes(2);
      expect(DEFAULT_PROPS.showPrevious).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(queryByTestId('next-button')).toBeTruthy());
      fireEvent.press(queryByTestId('next-button'));
      expect(Sound.releaseMock).toHaveBeenCalledTimes(2);
      expect(DEFAULT_PROPS.showNext).toHaveBeenCalledTimes(1);
    });
  });
});
