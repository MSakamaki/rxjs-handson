/// <reference path="../../typings/main.d.ts"/>

export interface rootPathInf {
  /** アプリケーションのルートディレクトリ(gulpfile.tsのある絶対パス) */
  root: string,
  /** ソースコードディレクトリ */
  src: string,
  /** gulpファイルの配置ディレクトリ */
  gulp: string,
  /** 一時ディレクトリ */
  tmp: string,
  /** 一時ディレクトリ(単体テスト用) */
  tmpSpec: string,
  /** Css一時ディレクトリ */
  tmpCss: string,
  /** 一時ディレクトリ(E2Eテスト用) */
  tmpE2e: string,
  /** 一時ディレクトリ(Jasmine Helper用) */
  tmpJasmine: string,
  /** リリース先ディレクトリ */
  dist: string,
  /** デモHTMLファイルディレクトリ */
  demo: string,
  /** report関係の置き場 */
  report: string,
  /** reportの小フォルダ coverage 関係の置き場 */
  coverage: string,
  /** karma関係の設定置き場 */
  karma: string,
  /** jasmine関係の設定置き場 */
  jasmine: string,
  /** protractor関係の設定置き場 */
  protractor: string,
};

export interface pathsInf {
  /** ソースコードファイル */
  src: {
    /** すべて */
    all: Array<string>
    /** typescriptファイル(spec, mockファイルを除く) */
    ts: Array<string>,
    /** htmlファイル */
    html: Array<string>,
    /** cssファイル */
    css: Array<string>,
    /** その他ファイル(image, font) */
    asset: Array<string>,
    /** build css ファイル */
    tmpBuildCss: Array<string>,
  },
  spec: {
    /** 単体テストファイル */
    unit: Array<string>,
    /** End to Endテストファイル */
    e2e: Array<string>,
    /** protractor含む End to Endテストファイル(コンパイル前) */
    protractor: Array<string>,
  },
  /** リリース関連のディレクトリ、ファイル */
  dist: {
    /** リリース先ファイル＆ディレクトリ */
    file: string,
    /** デプロイされたファイル */
    js: Array<string>,
  },
  /** karma関連の情報 */
  karma: {
    /** karma設定ファイルまでのパス */
    config: {
      /** デフォルト設定 */
      default: string,
    }
  },
  /** jasmine関連の情報 */
  jasmine: {
    /** jasmine設定ファイルまでのパス */
    config: {
      /** デフォルト設定 */
      default: string,
    },
    /** ヘルパファイル */
    helpers: Array<string>,
  },
  /** protractorの情報 */
  protractor: {
    /** protractor設定ファイルまでのパス */
    config: {
      /** デフォルト設定 */
      default: string,
    }
  }
};

export interface portsInf {
  /** 開発用ポート番号 */
  serve: number,
  /** デモ用ポート番号 */
  demo: number,
  /** coverageレポート用ポート番号 */
  coverage: number,
  /** mock用ポート番号 */
  mock: number,
}

/** mock生成処理本体 */
export interface MockInf {
  [index: string]: BrowserSyncsMockFuncInf;
}

/** mock内部処理 */
interface BrowserSyncsMockFuncInf {
    (req: any, res: any): void;
};

export interface BrowserSyncsInf {
  /** browsersync一意識別用ネームスペース */
  namespace: {
    /** serveコマンド用の一意識別子 */
    serve: string,
  }
  /** server時の設定 */
  serve: {
    browser: string,
    notify: boolean,
    port: number,
    files: Array<RegExp>,
    server: {
      index: string,
      baseDir: Array<string>,
      routes: Object,
      middleware: any,
    },
  },
  /** デモ用の定義 */
  demo: {
    browser: string,
    notify: boolean,
    port: number,
    files: Array<RegExp>,
    server: {
      index: string,
      baseDir: Array<string>,
      routes: Object,
    },
  },
  /** カバレッジ用の定義 */
  coverage: {
    browser: string,
    notify: boolean,
    port: number,
    files: Array<RegExp>,
    server: {
      index: string,
      baseDir: Array<string>,
    },
  },
  /** e2e用の定義 */
  e2e: {
    open: any,
    notify: boolean,
    port: number,
    files: Array<RegExp>,
    server: {
      baseDir: Array<string>,
      routes: Object,
    },
  },
}

export interface tsConfInf {
  /** server時のコンパイル */
  serve: {
    compilerOptions: tsConCompileOptionfInf;
  }
}

export interface tsConCompileOptionfInf {
  module?: string,
  target: string,
  removeComments?: boolean,
  preserveConstEnums?: boolean,
  outDir?: string,
  outFile?: string,
  sourceRoot?: string,
  rootDir?: string,
  sourceMap?: boolean,
  inlineSourceMap?: boolean,
  inlineSources?: boolean,
  sortOutput: boolean,
}