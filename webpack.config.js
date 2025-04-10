const path = require('path');

module.exports = {
  // Your entry point (modify if necessary)
  entry: './src/index.js', 

  // Your output configuration (modify if necessary)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Add fallbacks for Node.js core modules that Axios requires
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),           // Fallback for 'http'
      https: require.resolve('https-browserify'),     // Fallback for 'https'
      stream: require.resolve('stream-browserify'),   // Fallback for 'stream'
      zlib: require.resolve('browserify-zlib'),       // Fallback for 'zlib'
    },
  },

  // Additional configurations like module rules can go here
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',  // If you're using Babel
      },
    ],
  },
};
