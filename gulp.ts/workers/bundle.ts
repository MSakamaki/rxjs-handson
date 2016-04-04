/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gutil = require('gulp-util');
  const gulp = require('gulp');
  const fs = require('fs');
  const spawn = require('child_process').spawn;

  const taskname: string = 'bundle';

  gulp.task(taskname, (done: Function) => {
    var minify = spawn('node_modules/.bin/jspm', [
      'build',
      'main',
      '--minify',
      env.path.dist.file,
    ])
    stdOut(minify, (code: any) => {
      fileExists(env.path.dist.file, done);
      console.log('child process exited with code ' + code)
    });
    
  });

  /**
   * jspmビルドファイルの完了迄待機する
   */
  function fileExists(output: string, callback: Function) {
    fs.access(output, fs.F_OK, (err: any, stat: any) => {
      if (!!err && err.code === 'ENOENT') {
        gutil.log(taskname, `seatch '${output} file`);
        setTimeout(() => fileExists(output, callback), 500);
      } else if (err) {
        throw err;
      } else {
        gutil.log(taskname, `exists '${output} file`);
        callback();
      };
    });
  }

  function stdOut(child: any, cb: Function): void {
    child.stdout.on('data', (data: any) => process.stdout.write(data));
    child.stderr.on('data', (data: any) => process.stderr.write(data));
    child.on('close', cb);
  }

})();
