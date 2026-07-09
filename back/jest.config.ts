export default {
    collectCoverage: false,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.test\\.ts$',
    coverageDirectory: '../../coverage',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src/tests',
    clearMocks: true
};