

 + [ver 5.0 testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)
 + [test runner](https://github.com/ReactiveX/rxjs/blob/master/spec/helpers/tests2png/diagram-test-runner.js)
 + [writing marble test](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)
 + issues
  + [test](https://github.com/ReactiveX/rxjs/issues/1529)
  + [issues 150](https://github.com/ReactiveX/rxjs/issues/150)

## writing marble test

writing marble testは現状RxJSライブラリ用のテスト、アプリのテストは今後別途用意する的な話があるらしい。
べつにアプリのテストが出来ないわけではないので、一旦利用してみる。

### Ergonomic defaults for hot and cold

メソッドの引数に値が渡された場合をのぞき、hotとcoldの両方ではmarble diagramsに指定された値のcharectersは文字列としてStreamを構築します。

例：

`hot('--a--b')` の場合、"a"と"b"を出力します

`hot('--a--b', { a: 1, b: 2 })`の場合 1と2を出力します

#### 例外の出力

`hot('---#')`の場合は例外を出力します

`hot('---#', null, new SpecialError('test'))`の場合、例外に`new SpecialError('test')`を出力します


### Marble Syntax

Marbleの構文は時間の上に発生したイベントを文字列で表します。
Marble文字列の最初のは常にゼロフレームを表します。
「フレーム」は、仮想ミリ秒にやや近い表現になっています。

 + `-`  時間:  時間の経過、10フレームを表現します
 + `|`  完了:  observableの完了を表現します、これはobservable producer `complete()`が伝送されます
 + `#` 例外: observableを完了する例外です、これはobservable producer `error()`が伝送されます
 + `a` 任意の文字: producure `next()`で伝送された値を表現しています
 + `()` 同期グループ: 複数のイベントが同一フレーム内で実行されてる場合、
 + `^` サブスクリプションポイント： (hot observablesのみ) observablesの試験時、観測が始まる地点を示します。
`^`の位置がゼロフレームとなり、それより前の値は負の値になります。


### 実装のやりかた

適当に書いてるので境界値テストになっていないが、つっこんではいけない。

 + app
 
基本的に引数として Observable, subscribeと任意でSchedulerを渡す
処理の中ではstreamの制御を書くのがTestSchedulerでテストしやすい。

正直使いづらい・・・
 
```typescript
 import {Observable, Scheduler, Subscriber} from 'rxjs';

export function checkDoubleClick(
  observe: Observable<any>,
  subscribe: Subscriber<any>,
  scheduler?: Scheduler): void {
  // 250ミリ秒以内に連続したクリックが有ればthrottleTimeで纏められ、ダブルクリック扱いとなる
  observe
    .buffer(observe.throttleTime(250, scheduler))
    .map((x: Array<any>): number => x.length)
    .filter((n: number): boolean => n >= 2)
    .subscribe(subscribe);
}

```

 + spec

`rxHelper`はexpect用のjasmine独自ヘルパ

```typescript

import * as sample  from './sample';
import * as Rx from 'rxjs';
import {TestScheduler} from 'rxjs/testing/TestScheduler';

describe("rx test", function() {
  describe('checkDoubleClick', () => {
    it("double click action", () => {
      let ts = new TestScheduler(rxHelper.toDeepEqual);
      // a-->b の間が20frameなのでダブルクリック扱い
      var hotObs = ts.createHotObservable(
              /** */ '-a--b-----------------------------c-|');
      var expected = '-a--b-----------------------------c-|';
      var count = 0;
      var subscribe = Rx.Subscriber.create(
        (n: number) => {
          expect(n).toBe(2);
          count++;
        },
        () => void 0,
        // 上のcountがインクリメントされており、ダブクリ判定がある
        () => expect(count).toBe(1)
      );

      sample.checkDoubleClick(hotObs, subscribe, ts);

      ts.expectObservable(hotObs).toBe(expected);
      ts.flush();
    });

    it("single click action", () => {
      let ts = new TestScheduler(rxHelper.toDeepEqual);

      // b-->c の間は310frameなのでダブルクリック扱いされない
      var hotObs = ts.createHotObservable(
              /** */ '-a-------------------------------b-|');
      var expected = '-a-------------------------------b-|';

      var count = 0;
      var subscribe = Rx.Subscriber.create(
        (n: number) => count++,
        () => void 0,
        // 上のcountがインクリメントされていないので、ダブクリ判定なし
        () => expect(count).toBe(0)
      );

      sample.checkDoubleClick(hotObs, subscribe, ts);

      ts.expectObservable(hotObs).toBe(expected);
      ts.flush();
    });
  });
});

```

### coverage について

テストがめんどい(e2eとかで担保する)部分は[ignoringコメント](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)にてカバレッジ対象外にする。

