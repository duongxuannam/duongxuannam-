module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          navigation: './src/navigation',
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          languages: './src/languages',
          utils: './src/utils',
          constants: './src/constants',
          configureStore: './src/configureStore',
          data: './src/data',
          services: './src/services',
        },
        extensions: ['.android.js', '.ios.js', '.js'],
      },
    ],
  ],
  retainLines: true,
};
