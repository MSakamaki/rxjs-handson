/// <reference path="../../typings/main.d.ts"/>

// ENVIRONMENT=dist electron dest/platform/index.js
// script src <script src="./app.js"></script> only
import env from '../env';
(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('e2e', (cb: Function) =>
    runSequence(
      'clean:e2e',
      'tsc:e2e',
      'browsersync:e2e',
      'protractor',
      cb));
})();
