export const qaConfig = {
  paths: {
    generatedTests: "./runner/test-data/generated-tests",
    runResults: "./runner/test-data/run-results",
    acceptanceCriteria: "./runner/qa/src/specs/sampleAcceptanceCriteria.json"
  },
  rules: {
    failOnMissingCriteria: true
  }
};
