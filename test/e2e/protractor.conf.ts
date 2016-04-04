/// <reference path="../../typings/main.d.ts"/>

export var config = {
  baseUrl: '.',
  multiCapabilities: [
    {
      directConnect: false,
      browserName: 'firefox',
    },
  ],

  allScriptsTimeout: 110000,

  specs: [
    './spec/**/*.spec.js',
  ],
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
  },

  // テスト初期設定
  originalConfig: {
    TYPE: 'default',
  },
  onPrepare: (): void => {
    browser.ignoreSynchronization = true;
  },
};

