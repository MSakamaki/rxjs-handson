
### RxJSめも

RxJSは４系と５系の２種類ある本ソースでは5系を使用している

 + [４系](https://github.com/Reactive-Extensions/RxJS)
 + [５系](https://github.com/ReactiveX/rxjs)
 + [4->5移行ガイド](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)
 + [IxJS(類似品)](https://github.com/ReactiveX/IxJS)
   + Interactive Extensions 

### RxJSとは

 基本データ加工にイベント監視がついたもの

 + .net向けの人の説明
   + linq to event
 + javascriptエンジニア向けの説明
   + lodash to event
 + それ以外の説明
   + トリガー + バッチ + SQL


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

`Subscriber`と`Observable`の2つの機能を併せ持ったもの、
SubscriberにあるようなonNextやonError、onCompleteといったメソッドを呼び出せ、Observableのようにsubscribeメソッドを呼び出すことができる

 + [種類と特徴](http://qiita.com/hide92795/items/f7205c8171826cc2153b#subject%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%81%A8%E7%89%B9%E5%BE%B4)
   + AsyncSubject
   + BehavorSubject
   + PublishSubject
   + ReplaySubject

#### Scheduler

C#のDispatcherと似ているが存在理由が違う、どちらかと言うとreactのDispatcher
処理をどのタイミングで実行するのかを振り分ける機能。
スケジューラが間に入ることで、スレッドの切り替えや実行順序の変更などができるようになる。
非同期並列処理の安全で簡単な管理をする為に使う。





