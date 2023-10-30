// eslint-disable-next-line @typescript-eslint/no-var-requires
const publicConfig = require('../public/_index');

module.exports = {
  ...require('./default'),
  ...(publicConfig.env === 'dev' ? require('./dev') : {}),
  ...(publicConfig.env === 'prod' ? require('./prod') : {}),
};
