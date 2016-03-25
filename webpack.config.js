module.exports =  {
  entry: './src/app.js',
  output: {
    filename: './app/app.js'
  },
  module: {
    loaders: [
      { test: /\.js.*$/, exclude: /node_modules/, loader: "babel"}
    ]
  }
};
