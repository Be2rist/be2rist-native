export default class Sound {
  static DOCUMENT;

  static setCurrentTimeMock = jest.fn();

  static playMock = jest.fn();

  static pauseMock = jest.fn();

  static duration = 90;

  static currentTime = 0;

  static loaded = false;

  static callbackArgs;

  static releaseMock = jest.fn();

  static callback;

  static playComplete;

  constructor(sound, base, callback) {
    Sound.DOCUMENT = sound;
    Sound.callback = callback;
  }

  setCurrentTime(time) {
    Sound.setCurrentTimeMock(time);
  }

  getCurrentTime(callback) {
    if (callback) {
      callback(Sound.currentTime);
    }
  }

  play(playComplete) {
    Sound.playComplete = playComplete;
    Sound.playMock();
  }

  pause() {
    Sound.pauseMock();
  }

  getDuration() {
    return Sound.duration;
  }

  isLoaded() {
    return Sound.loaded;
  }

  release() {
    Sound.releaseMock();
  }
}
