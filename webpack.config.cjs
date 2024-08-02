const path = require('path');

module.exports = {
  entry: './main.jsx', // Punto de entrada de tu aplicación de React
  output: {
    path: path.resolve(__dirname, 'public'), // Directorio de salida
    filename: 'bundle.js' // Nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Archivos JS y JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usa Babel para transpilar el código
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/, // Archivos CSS
        use: ['style-loader', 'css-loader'] // Usa style-loader y css-loader para procesar los archivos CSS
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Extensiones de archivos a resolver
  }
};

