import publicConfig from './_index';

type Env = { env: 'prod' | 'dev' | 'local' };
type PublicConfig = typeof publicConfig & Env;

export default publicConfig as PublicConfig;
