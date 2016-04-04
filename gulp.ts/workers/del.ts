/// <reference path="../../typings/main.d.ts"/>

import env from '../env';
(() => {
  const gulp = require('gulp');
  const del = require('del');

  gulp.task('clean:dist', (done: Function) => del(env.dir.dist, done));

  gulp.task('clean:spec', (done: Function) => del(env.dir.tmpSpec, done));

  gulp.task('clean:coverage', (done: Function) => del(env.dir.coverage, done));
  
  gulp.task('clean:e2e', (done: Function) => del(env.dir.tmpE2e, done));

  gulp.task('clean:jasmineHelper', (done: Function) => del(env.dir.tmpJasmine, done));

  gulp.task('clean:buildcss', (done: Function) => del(env.path.src.tmpBuildCss, done));

})();