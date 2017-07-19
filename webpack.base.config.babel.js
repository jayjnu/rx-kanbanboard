import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'


export const SRC_PATH = path.resolve(__dirname, 'src');
export const OUT_PATH = path.resolve(__dirname, 'dist');

export default {
  entry: SRC_PATH,
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  output: {
    filename: 'rx-kanban-bundle.js',
    path: OUT_PATH,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'template.ejs'),
      inject: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader'
      }
    ]
  }
};