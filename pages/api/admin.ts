import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import withPayload from '@payloadcms/next-payload/middleware/withPayload'
import { SanitizedConfig } from 'payload/config';
import getWebpackDevConfig from 'payload/dist/webpack/getDevConfig';

let cached = global._payloadWebpack;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global._payloadWebpack = { compiler: null, webpackConfig: null };
}

export const getCompiler = (config: SanitizedConfig): {
  compiler: webpack.Compiler,
  webpackConfig: webpack.Configuration
} => {
  if (cached.compiler && cached.webpackConfig) {
    return cached;
  } else {
    const webpackDevConfig = getWebpackDevConfig(config);
    cached.webpackConfig = webpackDevConfig;
    cached.compiler = webpack(webpackDevConfig)
  }

  return cached;
};

async function handler(req, res) {
  const { compiler, webpackConfig } = getCompiler({
    ...req.payload.config,
    admin: {
      ...req.payload.config.admin,
      indexHTML: path.resolve(process.cwd(), './node_modules/payload/dist/admin/index.html')
    }
  });

  return webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output ? webpackConfig.output.publicPath : ''
  })(req, res, () => {
    return webpackHotMiddleware(compiler)(req, res, () => {
      return res.status(404)
    })
  })

  // console.log({ middleware })


  // webpackHotMiddleware(compiler)(req, res, () => {
  //   return webpackDevMiddleware(compiler, {
  //     publicPath: webpackConfig.output ? webpackConfig.output.publicPath : ''
  //   })
  // })
}

export default withPayload(
  handler
)
