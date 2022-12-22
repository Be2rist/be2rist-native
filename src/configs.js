export const {config} = __DEV__
  ? require('../environment/dev')
  : require('../environment/prod');
