/// <reference path="../../typings/main.d.ts"/>

// ENVIRONMENT=dist electron dest/platform/index.js
// script src <script src="./app.js"></script> only
import env from '../env';
(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('report:cov', (cb: Function) =>
    runSequence(
      ['clean:spec', 'clean:coverage', 'clean:jasmineHelper'],
      ['tsc:jasmineHelper', 'tsc'],
      'cov',
      cb));

  gulp.task('report:cov:view', (cb: Function) =>
    runSequence(
      ['clean:spec', 'clean:coverage', 'clean:jasmineHelper'],
      ['tsc:jasmineHelper', 'tsc'],
      'cov',
      'browsersync:coverage',
      cb));
})();
