import {
  Observable,
  Observer,
  Scheduler,
  Subscriber,
  Subject
} from 'rxjs';

// 後で使うインタフェース
export interface ISamples {
  id: number,
}

export interface ISample {
  id: number,
  name: string,
}
