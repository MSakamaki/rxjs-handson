/// <reference path="../typings/main.d.ts"/>

import ROOT_DIR          from './config/rootPaths';
import PATH              from './config/paths';
import PORTS             from './config/ports';
import BROWSER_SYNCS     from './config/browserSyncs';
import PCSS_AUTOPREFIXER from './config/postcss/autoprefixer';
import PCSS_DOIUSE       from './config/postcss/doiuse';
import PCSS_STYLELINT    from './config/postcss/stylelint';
import PCSS_CSSWRING     from './config/postcss/csswring';
import PCSS_REPORTER     from './config/postcss/postcss-reporter';
import * as pcssInf      from './config/postcss/_interfaces';
import * as confInf      from './config/_interfacees';

const packageJson = require('../package.json');

const ENV: envInf = {
  app: {
    version: packageJson.version,
    name: packageJson.name,
  },
  dir: ROOT_DIR,
  path: PATH,
  ports: PORTS,
  browserSync: BROWSER_SYNCS,
  postcss: {
    autoprefixer: PCSS_AUTOPREFIXER,
    doiuse: PCSS_DOIUSE,
    stylelint: PCSS_STYLELINT,
    csswring: PCSS_CSSWRING,
    postcssReporter: PCSS_REPORTER,
  }
};

interface envInf {
  /** アプリケーションの情報 */
  app: {
    version: string,
    name: string,
  },
  /** 各リソースディレクトリ */
  dir: confInf.rootPathInf,
  /** 各リソースファイルのパス */
  path: confInf.pathsInf,
  /** ポート一覧 */
  ports: confInf.portsInf,
  /**BrowserSyncの設定 */
  browserSync: confInf.BrowserSyncsInf,
  /** post css の設定 */
  postcss: {
    autoprefixer: pcssInf.IAutoprefixer,
    doiuse: pcssInf.IDoiuse,
    stylelint: pcssInf.IStylelint,
    csswring: pcssInf.ICsswring,
    postcssReporter: pcssInf.IPostcssRepoter,
  },
}

export default ENV;