/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('demo', (cb: Function) =>
    runSequence(
      'build',
      'browsersync:demo',
      cb));
})();