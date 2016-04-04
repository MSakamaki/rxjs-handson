/// <reference path="./typings/main.d.ts"/>

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const requireDir = require('require-dir');

gulpLoadPlugins();
requireDir('./gulp.ts',{recurse:true});
