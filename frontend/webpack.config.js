const webpack = require('webpack');

module.exports = {
  // ... andre webpack-indstillinger ...
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  plugins: [
    // Tilføj denne plugin for at definere process.env.NODE_ENV som 'production' (eller 'development', hvis det er tilfældet).
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
