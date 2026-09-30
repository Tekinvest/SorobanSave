module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/generated/**',
    '!src/tests/**',
  ],
  coverageDirectory: 'coverage',
  // Minimum coverage gate for the backend workspace (see docs/test-coverage.md).
  // Enforced baseline at 85%+ (Issue #1535).
  coverageThreshold: {
    global: {
      lines: 85,
      functions: 85,
      branches: 85,
      statements: 85,
    },
  },
  setupFilesAfterEnv: [],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      // Disable type-checking during test runs so that pre-existing TypeScript
      // errors in source files (e.g. missing Prisma generated types, insurance.ts
      // param types) do not block the test suite from compiling.  The
      // ts-jest transformer still transpiles correctly; type safety is enforced
      // separately via `npm run typecheck` / `tsc --noEmit`.
      diagnostics: false,
    }],
  },
};