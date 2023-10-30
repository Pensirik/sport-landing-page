const env = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';

module.exports = {
  env,
  ...require('./default'),
  ...(env === 'dev' ? require('./dev') : {}),
  ...(env === 'prod' ? require('./prod') : {}),
};
