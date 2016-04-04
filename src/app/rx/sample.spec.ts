/// <reference path="../../../typings/main.d.ts"/>
/// <reference path="../../../test/jasmine/helpers.d.ts"/>

import * as sample  from './sample';
import * as Rx from 'rxjs';
import {TestScheduler} from 'rxjs/testing/TestScheduler';

declare var rxHelper: any;

describe("rx test", function() {
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
});
