/// <reference path="../../typings/main.d.ts"/>

import env from '../env';

(() => {
  const gulp = require('gulp');
  const spawn = require('child_process').spawn;
  // tsc src/app/**/*.ts --outDir .tmp/ --target ES5 --moduleResolution node --sourceMap
  gulp.task('cov', (done: Function) => {

    childOut(spawn('istanbul', [
      'cover',
      'node_modules/jasmine/bin/jasmine.js',
      `JASMINE_CONFIG_PATH=${env.path.jasmine.config.default}`,
    ])).on('close', (code: number) => {
      //remap-istanbul -i report/coverage/coverage.json -o report/coverage/html -t html
      childOut(spawn('remap-istanbul', [
        '-i', `${env.dir.coverage}/coverage.json`,
        '-o', `${env.dir.coverage}/html`,
        '-t', 'html',
      ])).on('close', (code: number) => {
        done();
      });
    });
  });

  function childOut(child: any) {
    child.stdout.on('data', (data: any) => process.stdout.write(data));
    child.stderr.on('data', (data: any) => process.stdout.write(data));
    return child;
  }

})();