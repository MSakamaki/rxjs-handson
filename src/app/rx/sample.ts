import {
  Observable,
  Observer,
  Scheduler,
  Subscriber,
  Subject
} from 'rxjs';

// 後で使うインタフェース
export interface IData {
  id: number,
  name: string,
}
