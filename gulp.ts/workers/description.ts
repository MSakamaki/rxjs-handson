/// <reference path="../../typings/main.d.ts"/>

(() => {
  const gulp = require('gulp');
  const gulpDep = require('gulp-description');
  const description = {
    main: [
      'serve',
      'build',
      'help',
      'hls',
      'e2e',
      'demo',
      'report:cov',
      'report:cov:view',
      'unit',
    ],
    description: {
      'browsersync:coverage':'カバレッジ用のbrowserSync立ち上げ',
      'browsersync:demo':'デモ用のbrowserSync立ち上げ',
      'browsersync:e2e': 'e2eテスト用のbrowserSyncを立ち上げます',
      'browsersync:serve': '開発用のbrowserSync立ち上げ',
      build: 'リリースファイルをビルドします',
      bundle: 'jspmビルドを行います',
      'clean:coverage': 'カバレッジレポートを削除します',
      'clean:dist': 'リリースディレクトリを削除します',
      'clean:e2e': 'e2e関係のコンパイル後ファイルを削除します',
      'clean:jasmineHelper': 'jasmineのヘルパコンパイル後フォルダを削除します',
      'clean:spec':'カバレッジ用のコンパイルJSファイルを削除します',
      cov: 'istanbulとremap-istanbulを用いてtypescriptのカバレッジを生成します',
      default: 'ヘルプを実行します',
      demo: 'コンパイル後のライブラリでの動作確認をします',
      e2e: 'e2eテストを実行します',
      h: 'コマンド一覧を表示します',
      hdep: 'コマンド一覧の依存性を表示します',
      help: 'コマンド一覧を表示します',
      hls: 'すべてのコマンドを表示します',
      karma: '単体テストを実行します',
      'pcss:build':'postcssのビルドを行います',
      'pcss:dev':'postcssのライブリロード開発用のビルドタスクです',
      protractor: 'protractorを実行させます',
      'report:cov': 'カバレッジレポートを生成します',
      'report:cov:view': 'カバレッジレポートを生成し、ブラウザーで表示します',
      serve: 'ライブリロード開発を始めます',
      tsc: 'typescriptコンパイルを行い、.tmp/specフォルダに出力します。',
      'tsc:e2e': 'e2eテストのコンパイルを行います。',
      'tsc:jasmineHelper': 'jasmineのヘルパをコンパイルします。',
      'unit':'ライブリロードの単体テストを実行します',
      'watch:serve': 'ライブリロード用のウォッチ処理',
      webdriverUpdate: 'WebDriverマネージャのアップデート',
    },
  };

  gulp.task('help', () => gulpDep.help(description));
  gulp.task('h', () => gulpDep.help(description));
  gulp.task('hls', () => gulpDep.all(description));
  gulp.task('hdep', () => gulpDep.dependency(description));

})();
