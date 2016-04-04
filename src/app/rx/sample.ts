import {
  Observable,
  Observer,
  Scheduler,
  Subscriber,
  Subject
} from 'rxjs';

//import * as rxdom from 'rxjs/Rx.DOM'

export interface ISamples {
  id: number,
}

export interface ISample {
  id: number,
  name: string,
}

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

/**
 * observer examples
 */
export class SampleObservable {

  public fetchObserve: Observable<ISamples[]>;

  constructor(obs: Observable<ISamples[]>) {
    this.fetchObserve = obs;
  }
}

/**
 * subject examples
 */
export class SampleSubject {

  public fetchSubject: Subject<ISamples[]>;

  constructor() {
    this.fetchSubject = new Subject<ISamples[]>();
  }
}

