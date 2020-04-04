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
          screens: './src/screens',
          languages: './src/languages',
          utils: './src/utils',
          constants: './src/constants',
          configureStore: './src/configureStore',
          data: './src/data',
          services: './src/services',
          manager: './src/manager',
        },
        extensions: ['.android.js', '.ios.js', '.js'],
      },
    ],
  ],
  retainLines: true,
};
