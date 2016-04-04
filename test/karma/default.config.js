// Karma configuration
// Generated on Tue Mar 08 2016 11:38:42 GMT+0900 (JST)

module.exports = function(config) {
  config.set({
    basePath: '../../src/',
    frameworks: ['jspm', 'jasmine'],
    reporters: [
      'progress'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    files:[
      '../.tmp/jasmine/helpers/rxUtils.js',
    ],
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    proxies: {
      '/app/': '/base/app/',
      '/jspm_packages/': '/base/jspm_packages/',
    },

    jspm: {
      paths: {
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*",
        "formation-render/": "./"
      },
      config: 'jspm.config.js',
      browser: 'jspm.browser.js',
      packages: "jspm_packages/",
      loadFiles: [
        'app/**/*.spec.ts',
      ],
      serveFiles: [
        'app/**/*.ts',
        'app/**/*.css',
      ]
    },


  })
}
