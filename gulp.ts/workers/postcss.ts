/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const plumber = require('gulp-plumber');
  const postcss = require('gulp-postcss');
  const rename = require('gulp-rename');

  const browserSync = require('browser-sync');

  const postCssPlugins: Array<any> = [
    require('doiuse')(env.postcss.doiuse.options),
    require('autoprefixer')(env.postcss.autoprefixer.options),
    require('stylelint')(env.postcss.stylelint.options),
    require('postcss-reporter')(env.postcss.postcssReporter.options),
  ];

  gulp.task('pcss:dev', () => gulp.src(env.path.src.css)
    .pipe(plumber())
    .pipe(postcss(postCssPlugins))
    .pipe(rename({
      extname: '.css',
    }))
    .pipe(gulp.dest(`${env.dir.tmpCss}/app`))
    .pipe(browserSync.get(env.browserSync.namespace.serve).stream()));

  gulp.task('pcss:build', () => gulp.src(env.path.src.css)
    .pipe(plumber())
    .pipe(postcss(postCssPlugins))
    .pipe(rename({
      extname: '.css',
    }))
    .pipe(gulp.dest(`${env.dir.src}/app`)));
})();