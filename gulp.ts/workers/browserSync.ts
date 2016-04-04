/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const runSequence = require('run-sequence');

  const browserSync = require('browser-sync')
    .create(env.browserSync.namespace.serve);

  gulp.task('browsersync:serve', ()=> {
    browserSync.init(env.browserSync.serve);
  });

  gulp.task('browsersync:demo', ()=> {
    browserSync.init(env.browserSync.demo);
  });

  gulp.task('browsersync:coverage', ()=> {
    browserSync.init(env.browserSync.coverage);
  });

  gulp.task('browsersync:e2e', ()=> {
    browserSync.init(env.browserSync.e2e);
  });

})();