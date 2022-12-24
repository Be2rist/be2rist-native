import {getAudioTimeString} from 'utils/timeUtils';

describe('time utilities tests', () => {
  it('audio time seconds test', () => {
    expect(getAudioTimeString(0)).toBe('00:00:00');
    expect(getAudioTimeString(0.1)).toBe('00:00:00');
    expect(getAudioTimeString(59)).toBe('00:00:59');
  });

  it('audio time minutes test', () => {
    expect(getAudioTimeString(60)).toBe('00:01:00');
    expect(getAudioTimeString(61)).toBe('00:01:01');
    expect(getAudioTimeString(119)).toBe('00:01:59');
    expect(getAudioTimeString(600)).toBe('00:10:00');
  });

  it('audio time hours test', () => {
    expect(getAudioTimeString(3600)).toBe('01:00:00');
    expect(getAudioTimeString(36000)).toBe('10:00:00');
  });
});
