/// <reference path="../../typings/main.d.ts"/>

import path from './rootPaths';
import {pathsInf} from './_interfacees';

const SOURCE: pathsInf = {
  src: {
    all: [],
    ts: [
      `${path.src}/app/**/!(*spec).ts`,
    ],
    html: [],
    css: [
      `${path.src}/app/**/*.pcss`,
    ],
    asset: [],
    tmpBuildCss: [
      `${path.src}/app/**/*.css`
    ],
  },
  spec: {
    unit: [
      `${path.src}/app/**/*.spec.ts`,
    ],
    protractor: [
      `${path.protractor}/**/*.ts`,
    ],
    e2e: [
      `${path.tmpE2e}/**/*.spec.ts`,
    ],
  },
  dist:{
    file: `${path.dist}/index.js`,
    js: [
      `${path.dist}/**/*.js`
    ],
  },
  karma: {
    config:{
      default: `${path.karma}/default.config.js`,
    }
  },
  jasmine: {
    config:{
      default: `${path.jasmine}/jasmine.json`,
    },
    helpers: [
      `${path.jasmine}/**/*.ts`,
    ],
  },
  protractor: {
    config: {
      default: `${path.tmpE2e}/protractor.conf.js`,
    }
  }
};

export default SOURCE;
