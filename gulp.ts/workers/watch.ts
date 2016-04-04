/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const browserSync = require('browser-sync');

  gulp.task('watch:serve', () => {
    gulp.watch(env.path.src.html, browserSync.get(env.browserSync.namespace.serve).reload);
    gulp.watch(env.path.src.css, ['pcss:dev']);
    gulp.watch(env.path.src.ts, browserSync.get(env.browserSync.namespace.serve).reload);
  });
})();