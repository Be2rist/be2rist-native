import {createAudioCollage} from 'utils/pointContentUtils';

describe('point content utils tests', () => {
  it('image with time = 0 is specified test', () => {
    const point = {
      cover: '1',
      images: [
        {image: '2', time: 0},
        {image: '3', time: 1},
        {image: '4', time: 0.1},
      ],
    };
    expect(createAudioCollage(point)).toStrictEqual([
      {image: '2', time: 0},
      {image: '4', time: 0.1},
      {image: '3', time: 1},
    ]);
  });

  it('image with time = 0 is not specified test', () => {
    const point = {
      cover: '1',
      images: [
        {image: '2', time: 0.2},
        {image: '3', time: 1},
        {image: '4', time: 1},
      ],
    };
    expect(createAudioCollage(point)).toStrictEqual([
      {image: '1', time: 0},
      {image: '2', time: 0.2},
      {image: '3', time: 1},
      {image: '4', time: 1},
    ]);
  });

  it('empty image array test', () => {
    const point = {
      cover: '1',
      images: [],
    };
    expect(createAudioCollage(point)).toStrictEqual([{image: '1', time: 0}]);
  });

  it('images field undefined test', () => {
    const point = {
      cover: '1',
    };
    expect(createAudioCollage(point)).toStrictEqual([{image: '1', time: 0}]);
  });
});
