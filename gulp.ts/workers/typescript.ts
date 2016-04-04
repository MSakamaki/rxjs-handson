/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const spawn = require('child_process').spawn;
  const exec = require('child_process').exec;
  const merge = require('merge2');

  // // https://github.com/Microsoft/TypeScript/wiki/tsconfig.json
  const ts = require('gulp-typescript');
  const sourcemaps = require('gulp-sourcemaps');
  
  const tsConf = {
        target: 'es5',
        module: "commonjs",
        noImplicitAny: true,
        removeComments: true,
        moduleResolution: 'node',
        declaration: true,
      };

  gulp.task('tsc', (done: Function) => {

    const child = exec('node_modules/.bin/tsc src/app/**/*.ts --outDir .tmp/spec/ --target ES5 --moduleResolution node --sourceMap --module commonjs',
      (error: any, stdout: any, stderr: any) => {
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        done();
      });
  });

  gulp.task('tsc:jasmineHelper', () => {

    var tsResult = gulp.src(env.path.jasmine.helpers)
      .pipe(sourcemaps.init())
      .pipe(ts(tsConf));

    return merge([
      tsResult.dts.pipe(gulp.dest(`${env.dir.jasmine}`)),
      tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(env.dir.tmpJasmine)),
    ]);
  });

  gulp.task('tsc:e2e', () => {
    return gulp.src(env.path.spec.protractor)
      .pipe(sourcemaps.init())
      .pipe(ts({
        target: 'es5',
        module: "commonjs",
        noImplicitAny: true,
        moduleResolution: 'node',
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(env.dir.tmpE2e));
  });

})();