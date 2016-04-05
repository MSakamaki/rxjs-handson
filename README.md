



### 初期設定


```sh
# グローバルモジュールインストール
npm -g install gulp typescript-node typescript-register ts-node

# npmのインストール
npm install

# アプリ用ライブラリのインストール
jspm install

```

### コマンド一覧

```sh
# コマンド一覧と説明
gulp help

```

### レポート

```sh

tsc src/app/**/*.ts --outDir .tmp/ --target ES5 --moduleResolution node --sourceMap

istanbul cover node_modules/jasmine/bin/jasmine.js

remap-istanbul -i coverage/coverage.json -o coverage/coverage-remapped.json

```

### 諸注意

 + `jspm`と`npm`の以下のモジュールバージョンを合わせる
   + nodejs
   + jspm

### 参考資料

 + [typescript型定義管理(typings)](https://github.com/typings/typings)
 + [Rx Js API](http://rxmarbles.com/)
 + [d3.js](https://d3js.org/) 

#### Typescript

 + [TypeScript playground](http://www.typescriptlang.org/play/)

##### VS Code Plugins

 + [Can I Use](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-caniuse)

###### 作り方

 + [generator-code](https://github.com/Microsoft/vscode-generator-code)

#### RxJS Docs

 + [RxJS 概要とリアクティブ アーキテクチャ](https://speakerdeck.com/dsuket/rxjsgai-yao-toriakuteihu-akitekutiya)
 + [RxJS + D3js](https://github.com/Reactive-Extensions/RxJS/tree/master/examples/d3)
 + [Drag and Drop](https://github.com/Reactive-Extensions/RxJS/blob/master/examples/dragndrop/dragndrop.js) 
 + [さねゆき師匠のgist](https://gist.github.com/saneyuki/be133d505b1eb91b4c72)
 + [Rx学習ノート](http://wilfrem.github.io/learn_rx/index.html)
