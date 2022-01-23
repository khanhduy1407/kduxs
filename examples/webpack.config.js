const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { KduLoaderPlugin } = require('kdu-loader')

function buildEntry (dirname) {
  const lookupDir = path.join(__dirname, dirname)

  return fs.readdirSync(lookupDir).reduce((entries, dir) => {
    const fullDir = path.join(lookupDir, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[`${dirname}/${dir}`] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {})
}

module.exports = {
  mode: 'development',

  entry: {
    ...buildEntry('classic'),
    ...buildEntry('composition')
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.kdu$/, use: ['kdu-loader'] },
      { test: /\.css$/, use: ['kdu-style-loader', 'css-loader'] }
    ]
  },

  resolve: {
    alias: {
      kduxs: path.resolve(__dirname, '../src/index.js')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'shared',
          filename: 'shared.js',
          chunks: 'initial'
        }
      }
    }
  },

  plugins: [
    new KduLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
