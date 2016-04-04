/// <reference path="../../../typings/main.d.ts"/>

import * as Rx from 'rxjs';
import * as d3 from 'd3';
import * as rxSample from '../rx/sample';
import * as d3Sample from '../d3/sample';

declare function fetch(url: string): Promise<any>;

var sample2: HTMLDivElement = <HTMLDivElement>document.querySelector('.sample2');

const toSampleJson = (res: Body): Promise<rxSample.ISample[]> => res.json();
const toSamplesJson = (res: Body): Promise<rxSample.ISamples> => res.json();

export function exec() {

  /** initializeing */
  sample2.textContent = '丸いFOOはドラッグ&ドロップで動くよ';
  d3Sample.sample1();

  /** use export api */
  (() => {})();

  /** drag and drop */
  (() => {})();

  /** ちょっと実践的な使い方 (Observable) */
  (() => {})();

  /** より実践的な使い方 (Subject) */
  (() => {})();
}