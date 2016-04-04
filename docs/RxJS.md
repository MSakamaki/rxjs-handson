
### RxJSめも

RxJSは４系と５系の２種類ある本ソースでは5系を使用している

 + [４系](https://github.com/Reactive-Extensions/RxJS)
 + [５系](https://github.com/ReactiveX/rxjs)
 + [4->5移行ガイド](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)

### RxJSとは

 基本データ加工にイベント監視がついたもの

 + .net向けの人の説明
   + linq to event
 + javascriptエンジニア向けの説明
   + lodash to event
 + それ以外の説明
   + トリガー + バッチ + SQL っぽい


一連のイベントを管理する為に色々もりだくさんなライブラリ

### RxJSを触る際まえに理解しときたい事

非同期イベントをRxJSで管理するにあたって必要な概念は以下の６種類

#### Observable

観測可能 (observable) なシーケンスを作り出す
ObserverはObservableの変化に対するストリームを行う処理を扱う事が出来る。

#### Observer

Observableのコールスタックコレクション
Observableシーケンスに対して何をどうするか定義したもの

#### Operators

Rxで使える演算子の事

[やりたいこと逆引き1](http://reactivex.io/documentation/operators.html)
[やりたいこと逆引き2](http://xgrommx.github.io/rx-book/content/which_operator_do_i_use/index.html)


#### Single

rx.Singleは1回しかストリームを作らない子
Rx.Promise、またはPromise的なのに使う

#### Subject

ホットな奴

`Subscriber`と`Observable`の2つの機能を併せ持ったもの、
SubscriberにあるようなonNextやonError、onCompleteといったメソッドを呼び出せ、Observableのようにsubscribeメソッドを呼び出すことができる

 + [種類と特徴](http://qiita.com/hide92795/items/f7205c8171826cc2153b#subject%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%81%A8%E7%89%B9%E5%BE%B4)
   + AsyncSubject
   + BehavorSubject
   + PublishSubject
   + ReplaySubject

#### Scheduler

Dispatcher
処理をどのタイミングで実行するのかを振り分ける機能。
スケジューラが間に入ることで、スレッドの切り替えや実行順序の変更などができるようになる。
非同期並列処理の安全で簡単な管理をする為に使う。



## フォルダ構成

```sh
.
├── demo
│   ├── deploy.html   " gulp demo で起動
│   ├── develop.html  # gulp serve で起動
│   └── favicon.ico
├── docs
│   ├── RxJS.md     # 本資料
│   └── RxTest.md   # テストについて
├── src
│   ├── app
│   │   ├── d3                   # レンダリング回りの処理 (今回さわりません)
│   │   │   ├── sample.spec.ts
│   │   │   └── sample.ts
│   │   ├── example
│   │   │   └── sample.ts        # 今回主に触るメインプログラム
│   │   ├── rx                   # rxjs回りの処理
│   │   │   ├── sample.spec.ts
│   │   │   └── sample.ts
│   │   ├── main.pcss
│   │   └── main.ts
│   ├── jspm.browser.js
│   └── jspm.config.js
├── gulp.ts     # gulpのタスクたち
├── test        #テスト回りの設定
├── typings     # 型定義ファイル
├── README.md
├── gulpfile.ts
├── package.json
├── tsconfig.json
├── stylelint.config.js
└── typings.json
```


## Observableの使い方

### ダブルクリックイベントのフック

`src/app/rx/sample.ts`

```typescript
export function checkDoubleClick(
  observe: Observable<any>,
  subscribe: Subscriber<any>,
  scheduler?: any): void {

  observe
    .buffer(observe.throttleTime(250, scheduler))
    .map((x: Array<any>): number => x.length)
    .filter((n: number): boolean => n >= 2)
    .subscribe(subscribe);
}
```

`src/app/example/sample.ts`

```typescript
  let clickStream = Rx.Observable.fromEvent(document, 'mouseup');
  let subscribe = Rx.Subscriber.create(function(n) { console.log(n + "click"); })
  rxSample.checkDoubleClick(clickStream, subscribe);
```

### ドラッグ＆ドロップ

`src/app/rx/sample.ts`

```typescript
export function dragAndDropObserve(
  mouseUpObserve: Observable<{}>,
  mouseDownObserve: Observable<{}>,
  mouseMoveObserve: Observable<{}>,
  beforeMouseDown: Function,
  subscribeMouseUp: Subscriber<any>,
  subscribe: Subscriber<any>,
  scheduler?: any
): void {

  var source = mouseDownObserve
    .do(() => beforeMouseDown())
    .flatMap((mdEvent: MouseEvent) =>
      mouseMoveObserve
        .map((mmEvent: MouseEvent) => mmEvent)
        .takeUntil(mouseUpObserve))

  mouseUpObserve.subscribe(subscribeMouseUp);
  source.subscribe(subscribe);
}
```

`src/app/example/sample.ts`


```typescript
  /** drag and drop */
  (() => {
    /** get d3 object */
    var circle = d3.select('.fr__sample-circle');

    /** make observer */
    var dragMU = Rx.Observable.fromEvent(circle.node(), 'mouseup');
    var dragMM = Rx.Observable.fromEvent(document, 'mousemove');
    var dragMD = Rx.Observable.fromEvent(circle.node(), 'mousedown');

    /** event setting */
    var mouseDown = () => d3Sample.changeCircleColor('blue');
    var subscribeMouseDown = Rx.Subscriber.create(() => d3Sample.changeCircleColor('purple'));
    var subscribe = Rx.Subscriber.create((pos: MouseEvent) => d3Sample.reWriteCircle(pos.clientX, pos.clientY));

    // create RxJS
    rxSample.dragAndDropObserve(dragMU, dragMD, dragMM, mouseDown, subscribeMouseDown, subscribe)
  })();
```

### テストコードの実装(ダブルクリック)

`src/app/rx/sample.spec.ts`

```typescript
  describe('checkDoubleClick', () => {
    it("double click action", () => {
      let ts = new TestScheduler(rxHelper.toDeepEqual);

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
        () => expect(count).toBe(1)
      );

      sample.checkDoubleClick(hotObs.asObservable(), subscribe, ts);

      ts.expectObservable(hotObs.asObservable()).toBe(expected);
      ts.flush();
    });

    it("single click action", () => {
      let ts = new TestScheduler(rxHelper.toDeepEqual);

      var hotObs = ts.createHotObservable(
              /** */ '-a-------------------------------b-|');
      var expected = '-a-------------------------------b-|';

      var count = 0;
      var subscribe = Rx.Subscriber.create(
        (n: number) => count++,
        () => void 0,
        () => expect(count).toBe(0)
      );

      sample.checkDoubleClick(hotObs.asObservable(), subscribe, ts);

      ts.expectObservable(hotObs.asObservable()).toBe(expected);
      ts.flush();
    });
  });
```

### テストコードの実装(ドラッグ＆ドロップ)

`src/app/rx/sample.spec.ts`

```typescript
  describe('drag and drop', () => {
    it("action case", () => {
      let ts = new TestScheduler(rxHelper.toDeepEqual);

      const value = {
        a: {},
        b: {
          pageX: 100,
          pageY: 150,
        },
        c: {
          pageX: 120,
          pageY: 170,
        }
      };

      var expectAry: Array<any> = [];

      var mouseDown = ts.createHotObservable('--a------|', value);
      var mouseMove = ts.createHotObservable('--bbcc---|', value);
      var mouseUp__ = ts.createHotObservable('-----a---|', value);

      var subscribeMouseUp = Rx.Subscriber.create(
        (n: any) => {
          expectAry.push(n);
        },
        () => void 0,
        () => expectAry.push('complite: subscribeMouseUp')
      );

      var subscribe = Rx.Subscriber.create(
        (n: any) => {
          expectAry.push(n);
        },
        () => void 0,
        () => expectAry.push('complite: subscribe')
      );

      sample.dragAndDropObserve(
        mouseUp__.asObservable(),
        mouseDown.asObservable(),
        mouseMove.asObservable(),
        () => expectAry.push('before mouse down'),
        subscribeMouseUp,
        subscribe,
        ts);

      // expect
      ts.expectObservable(mouseDown.asObservable()).toBe('--a------|', value);
      ts.expectObservable(mouseMove.asObservable()).toBe('--bbcc---|', value);
      ts.expectObservable(mouseUp__.asObservable()).toBe('-----a---|', value);
      ts.flush();
      expect(expectAry.length).toBe(8);
      expect(expectAry[0]).toBe('before mouse down');
      expect(expectAry[1]).toEqual({ pageX: 100, pageY: 150 });
      expect(expectAry[2]).toEqual({ pageX: 100, pageY: 150 });
      expect(expectAry[3]).toEqual({ pageX: 120, pageY: 170 });
      expect(expectAry[4]).toEqual({ pageX: 120, pageY: 170 });
      expect(expectAry[5]).toEqual({});
      expect(expectAry[6]).toBe('complite: subscribe');
      expect(expectAry[7]).toBe('complite: subscribeMouseUp');
    });
  });
```


### ちょっと実践的な使い方 (Observable)


`src/app/rx/sample.ts`

```typescript
/**
 * observer examples
 */
export class SampleObservable {

  public fetchObserve: Observable<ISamples[]>;

  constructor(obs: Observable<ISamples[]>) {
    this.fetchObserve = obs;
  }
}

```

`src/app/example/sample.ts`


```typescript
  /** より実践的な使い方 (Observable) */
  (() => {
    /** 定義 */
    var observe = new rxSample.SampleObservable(Rx.Observable.fromPromise(fetch('/api/sample').then(toSampleJson)));
    var source = observe.fetchObserve
      .flatMap((data: rxSample.ISamples[]): rxSample.ISamples[] => data)
      .mergeMap((data: rxSample.ISamples): Rx.Observable<rxSample.ISamples> =>
        Rx.Observable.fromPromise(fetch(`/api/sample/${data.id}`).then(toSamplesJson)));

    /** View Component A */
    (() => {
      let requestSubscribeA = Rx.Subscriber.create(
        (data: rxSample.ISample) => d3Sample.createRundomText(data.id, data.name, 'pink'),
        (e: Error) => console.log(e),
        () => console.log('A OBSERVABLE COMPLITE')
      )

      source
        .subscribe(requestSubscribeA);
    })();

    /** View Component B */
    (() => {
      let requestSubscribeB = Rx.Subscriber.create(
        (data: rxSample.ISample) => d3Sample.createRundomText(data.id, data.name, 'gray'),
        (e: Error) => console.log(e),
        () => console.log('B OBSERVABLE COMPLITE')
      );

      source
        .subscribe(requestSubscribeB);
    })();
  })();

```


### より実践的な使い方 (Subject)

`src/app/rx/sample.ts`

```typescript
/**
 * subject examples
 */
export class SampleSubject {

  public fetchSubject: Subject<ISamples[]>;

  constructor() {
    this.fetchSubject = new Subject<ISamples[]>();
  }
}
```

`src/app/example/sample.ts`

```typescript
  /** より実践的な使い方 (Subject) */
  (() => {
    var subject = new rxSample.SampleSubject();
    var source = subject.fetchSubject
      .flatMap((data: rxSample.ISamples[]): rxSample.ISamples[] => data)
      .mergeMap((data: rxSample.ISamples): Rx.Observable<rxSample.ISamples> =>
        Rx.Observable.fromPromise(fetch(`/api/sample/${data.id}`).then(toSamplesJson)));

    /** View Component A */
    (() => {
      let requestSubscribeA = Rx.Subscriber.create(
        (data: rxSample.ISample) => d3Sample.createRundomText(data.id, data.name, 'green'),
        (e: Error) => console.log(e),
        () => console.log('A SUBJECT COMPLITE')
      )

      source
        .subscribe(requestSubscribeA);
    })();

    /** View Component B */
    (() => {
      let requestSubscribeB = Rx.Subscriber.create(
        (data: rxSample.ISample) => d3Sample.createRundomText(data.id, data.name, 'yellow'),
        (e: Error) => console.log(e),
        () => console.log('B SUBJECT COMPLITE')
      );

      source
        .subscribe(requestSubscribeB);
    })();

    /** Action Component */
    (() => {
      fetch('/api/sample').then(toSampleJson).then((data: rxSample.ISamples[]) => {
        subject.fetchSubject.next(data);
      })
    })();
  })();
```


