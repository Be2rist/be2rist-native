import {audioLink, imageLink} from 'utils/googleLinks';

describe('google links tests', () => {
  it('test image link', () => {
    expect(imageLink('id1')).toBe(
      'https://drive.google.com/uc?export=view&id=id1',
    );
  });

  it('test audio link', () => {
    expect(audioLink('id1')).toBe(
      'https://docs.google.com/uc?export=download&id=id1',
    );
  });
});
