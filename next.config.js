/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const ESLintPlugin = require('eslint-webpack-plugin');

const publicConfig = require('./src/config/public/_index');

// eslint-disable-next-line import/order
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig) => {
    return {
      ...webpackConfig,
      plugins: [
        ...webpackConfig.plugins,
        new ESLintPlugin({
          extensions: ['.ts', '.tsx', '.js'],
        }),
      ],
    };
  },
  async rewrites() {
    return {
      ...(publicConfig.env === 'local'
        ? {
          beforeFiles: [{
            source: `${publicConfig.apiBasePath}/:path*`,
            destination: `${publicConfig.apiProtocol}://${publicConfig.apiDomain}${publicConfig.apiBasePath}/:path*`,
          }],
        }
        : {}
      ),
      afterFiles: [
        {
          source: `${publicConfig.nextApiBasePath}/:path*`,
          destination: '/api/:path*',
        },
      ],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
