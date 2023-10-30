// eslint-disable-next-line @typescript-eslint/no-var-requires
const publicConfig = require('../public/_index');

const apiProtocol = process.env.APP_DOMAIN ?? publicConfig.apiProtocol;
const apiDomain = process.env.APP_DOMAIN ?? publicConfig.apiDomain;

module.exports = {
  apiProtocol,
  apiDomain,
};
