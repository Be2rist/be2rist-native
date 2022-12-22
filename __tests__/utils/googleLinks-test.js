import {audioLink, googleMapStatic, imageLink} from 'utils/googleLinks';

jest.mock('configs', () => ({
  config: {
    GOOGLE_MAP_API_KEY: 'TEST_API_KEY',
  },
}));

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

  it('test google maps link with location', () => {
    const location = {latitude: 18.1, longitude: 50.1};
    expect(googleMapStatic({location})).toBe(
      'https://maps.googleapis.com/maps/api/staticmap?zoom=19&markers=color%3Agreen%7Clabel%3AB%7C18.1%2C50.1&maptype=roadmap&size=600x300&key=TEST_API_KEY',
    );

    const location1 = {_latitude: 18.1, _longitude: 50.1};
    expect(googleMapStatic({location: location1})).toBe(
      'https://maps.googleapis.com/maps/api/staticmap?zoom=19&markers=color%3Agreen%7Clabel%3AB%7C18.1%2C50.1&maptype=roadmap&size=600x300&key=TEST_API_KEY',
    );
  });

  it('test google maps link without location', () => {
    expect(googleMapStatic({})).toBe(
      'https://maps.googleapis.com/maps/api/staticmap?zoom=19&maptype=roadmap&size=600x300&key=TEST_API_KEY',
    );
  });
});
