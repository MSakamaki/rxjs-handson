/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(()=>{})();
const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const webdriverUpdate = require('gulp-protractor').webdriver_update;

gulp.task('webdriverUpdate', webdriverUpdate);

gulp.task('protractor', ['webdriverUpdate'], () => {

  return gulp.src(env.path.spec.e2e)
    .pipe(protractor({
      configFile: env.path.protractor.config.default,
    }))
    .on('error', (e: Error) => { throw e });
});


