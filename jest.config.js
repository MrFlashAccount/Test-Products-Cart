module.exports = {
  coverageDirectory: 'coverage',
  rootDir: './src',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
