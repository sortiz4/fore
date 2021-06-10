const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

exports.config = {
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  directConnect: true,
  allScriptsTimeout: 11000,
  SELENIUM_PROMISE_MANAGER: false,
  specs: [
    './src/**/*.e2e-spec.ts',
  ],
  capabilities: {
    browserName: 'chrome',
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true,
    print: () => {},
  },
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false);
    require('ts-node').register({ project: require('path').join(__dirname, './tsconfig.json') });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: StacktraceOption.PRETTY } }));
  },
};
