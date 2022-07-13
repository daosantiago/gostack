const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  devServer: {
    static: path.resolve(__dirname, 'public'),
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader'}, // injeta no html o css interpretado pelo css-loader
          { loader: 'css-loader'},   // carrega o arquivo css e interpreta as importações dentro dele
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader'
        },
      }
    ]
  }
}