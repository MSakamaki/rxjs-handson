/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('serve', (cb: Function) =>
    runSequence(
      'watch:serve',
      'pcss:dev',
      'browsersync:serve',
      cb));
})();