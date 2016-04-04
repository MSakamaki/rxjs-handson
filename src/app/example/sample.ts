/// <reference path="../../../typings/main.d.ts"/>

import * as Rx from 'rxjs';
import * as d3 from 'd3';
import * as rxSample from '../rx/sample';
import * as d3Sample from '../d3/sample';

declare function fetch(url: string): Promise<any>;

var sample2: HTMLDivElement = <HTMLDivElement>document.querySelector('.sample2');
const toJson = (res: any): any => res.json();

export function exec() {

  /** initializeing */
  sample2.textContent = '丸いFOOはドラッグ&ドロップで動くよ(まだ動かない)';
  d3Sample.sample1();

  /** use export api */
  let clickStream = Rx.Observable.fromEvent(document, 'mouseup');
  let subscribe = Rx.Subscriber.create(function(n) { console.log(n + "click"); })
  rxSample.checkDoubleClick(clickStream, subscribe);

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

  /** より実践的な使い方 (Observable) */
  (() => {
    /** 定義 */
    var observe = new rxSample.SampleObservable(Rx.Observable.fromPromise(fetch('/api/sample').then(toJson)));
    var source = observe.fetchObserve
      .flatMap((data: any): any => data)
      .mergeMap((data: any) => Rx.Observable.fromPromise(fetch(`/api/sample/${data.id}`).then(toJson)));

    /** View Component A */
    (() => {
      let requestSubscribeA = Rx.Subscriber.create(
        (data: rxSample.IData) => d3Sample.createRundomText(data.id, data.name, 'pink'),
        (e: Error) => console.log(e),
        () => console.log('A OBSERVABLE COMPLITE')
      )

      source
        .subscribe(requestSubscribeA);
    })();

    /** View Component B */
    (() => {
      let requestSubscribeB = Rx.Subscriber.create(
        (data: rxSample.IData) => d3Sample.createRundomText(data.id, data.name, 'gray'),
        (e: Error) => console.log(e),
        () => console.log('B OBSERVABLE COMPLITE')
      );

      source
        .subscribe(requestSubscribeB);
    })();
  })();

  /** より実践的な使い方 (Subject) */
  (() => {
    var subject = new rxSample.SampleSubject();
    var source = subject.fetchSubject
      .flatMap((data: any): any => data)
      .mergeMap((data: any) => Rx.Observable.fromPromise(fetch(`/api/sample/${data.id}`).then(toJson)));

    /** View Component A */
    (() => {
      let requestSubscribeA = Rx.Subscriber.create(
        (data: rxSample.IData) => d3Sample.createRundomText(data.id, data.name, 'green'),
        (e: Error) => console.log(e),
        () => console.log('A SUBJECT COMPLITE')
      )

      source
        .subscribe(requestSubscribeA);
    })();

    /** View Component B */
    (() => {
      let requestSubscribeB = Rx.Subscriber.create(
        (data: rxSample.IData) => d3Sample.createRundomText(data.id, data.name, 'yellow'),
        (e: Error) => console.log(e),
        () => console.log('B SUBJECT COMPLITE')
      );

      source
        .subscribe(requestSubscribeB);
    })();

    /** Action Component */
    (() => {
      fetch('/api/sample').then(toJson).then((data: any) => {
        subject.fetchSubject.next(data);
      })
    })();
  })();
}