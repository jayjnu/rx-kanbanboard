import webpack from 'webpack';
import baseConfig, { SRC_PATH, OUT_PATH } from './webpack.base.config.babel';
import merge from 'webpack-merge';

export default merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    overlay: true,
    host: 'test.daum.net',
    port: 5050,
    open: true,
    openPage: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});