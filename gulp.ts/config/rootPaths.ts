import {rootPathInf} from './_interfacees';

const root = process.cwd();

const ROOT_PATH: rootPathInf = {
  root: root,
  src: `${root}/src`,
  gulp: `${root}/gulp.ts`,
  tmp: `${root}/.tmp`,
  tmpSpec: `${root}/.tmp/spec`,
  tmpCss: `${root}/.tmp/css`,
  tmpE2e: `${root}/.tmp/e2e`,
  tmpJasmine: `${root}/.tmp/jasmine`,
  dist: `${root}/dist`,
  demo: `${root}/demo`,
  report: `${root}/report`,
  coverage: `report/coverage`,
  karma: `${root}/test/karma`,
  jasmine: `${root}/test/jasmine`,
  protractor: `${root}/test/e2e`,
};

export default ROOT_PATH;
