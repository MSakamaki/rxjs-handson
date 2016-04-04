/// <reference path="../../typings/main.d.ts"/>

// ENVIRONMENT=dist electron dest/platform/index.js
// script src <script src="./app.js"></script> only
import env from '../env';

(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  gulp.task('build', (cb: Function) =>
    runSequence(
      'clean:dist',
      'pcss:build',
      'report:cov',
      'bundle',
      'clean:buildcss',
      cb));
})();
