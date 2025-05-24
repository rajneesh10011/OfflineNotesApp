module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Ignore all node_modules EXCEPT these packages:
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux|react-native-sqlite-storage|@react-native-community)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
