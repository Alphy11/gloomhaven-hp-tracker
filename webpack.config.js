const path = require('path');
const webpack = require('webpack');

// Build profiles: use NODE_ENV
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  devtool: "#inline-source-map",
  devServer: {
    hot: true,
    inline: true,
    open: true,
    port: 8080,
    contentBase: '.' //path.join(__dirname, 'dist')
  },
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, 'src/')],
        loader: 'babel-loader',
        query: {
          presets: ['airbnb'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
