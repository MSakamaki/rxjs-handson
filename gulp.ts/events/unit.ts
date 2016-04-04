/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('unit', (cb: Function) =>
    runSequence(
      'clean:jasmineHelper',
      'tsc:jasmineHelper',
      'karma',
      cb));
})();