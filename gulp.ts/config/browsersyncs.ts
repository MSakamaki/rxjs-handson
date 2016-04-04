/// <reference path="../../typings/main.d.ts"/>

import ROOT_PATHS from './rootPaths';
import PATH from './paths';
import PORTS from './ports';
import Mocks from './mocks';
import {BrowserSyncsInf} from './_interfacees';

const openBrowser: string = 'firefox';

const checkFiles = [
  /** match pattern : https://github.com/es128/anymatch  */
  new RegExp(`${ROOT_PATHS.src}/*\.html`),
  new RegExp(`${ROOT_PATHS.src}/*\.(css|svg|eot|ttf|woff)`),
  new RegExp(`${ROOT_PATHS.tmp}/*\.(js|css|html)`),
];

const BROWSER_SYNC: BrowserSyncsInf = {
  namespace: {
    serve: 'bs-serve',
  },
  serve: {
    browser: openBrowser,
    notify: true,
    port: PORTS.serve,
    files: checkFiles,
    server: {
      index: 'develop.html',
      baseDir: [
        ROOT_PATHS.demo,
        ROOT_PATHS.src,
        ROOT_PATHS.tmpCss,
      ],
      routes: {
        '/node_modules': 'node_modules',
      },
      middleware: function(req: any, res: any, next: Function) {
        var mock = Mocks(req, res, next).get(req.url);
        if ( mock )
          mock(req, res);
        else
          next();
      }
    },
  },
  demo: {
    browser: openBrowser,
    notify: true,
    port: PORTS.demo,
    files: checkFiles,
    server: {
      index: 'deploy.html',
      baseDir: [
        ROOT_PATHS.dist,
        ROOT_PATHS.tmp,
        ROOT_PATHS.demo,
        ROOT_PATHS.tmpCss,
      ],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  },
  coverage: {
    browser: openBrowser,
    notify: false,
    port: PORTS.coverage,
    files: checkFiles,
    server: {
      index: 'index.html',
      baseDir: [
        `${ROOT_PATHS.coverage}/html`,
      ],
    },
  },
  e2e: {
    open: false,
    notify: false,
    port: PORTS.serve,
    files: checkFiles,
    server: {
      baseDir: [
        ROOT_PATHS.demo,
        ROOT_PATHS.src,
        ROOT_PATHS.tmpCss,
      ],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  },
};

export default BROWSER_SYNC;
