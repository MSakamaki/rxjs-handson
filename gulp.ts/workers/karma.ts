/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const Server = require('karma').Server;

  gulp.task('karma', (done: Function) => {
    new Server({
      configFile: env.path.karma.config.default,
      singleRun: false
    }, done).start();
  });
})();