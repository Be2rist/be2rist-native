/**
 * Creates an array of image collages from point sorted by time.
 * Uses point cover as a default image if no images are specified with time = 0.
 *
 * @param point media point.
 * @returns {*[]} array of images with time.
 */
export const createAudioCollage = point =>
  [
    ...(!point.images ||
    !point.images.length ||
    !point.images.some(image => !image.time)
      ? [{image: point.cover, time: 0}]
      : []),
    ...(point.images ? point.images : []),
  ].sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });
