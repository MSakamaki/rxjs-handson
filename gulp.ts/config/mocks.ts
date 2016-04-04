/// <reference path="../../typings/main.d.ts"/>

import {MockInf} from './_interfacees';

const Mocks: Function = (req: any, res: any, callback?: Function): any => {

  /** API定義 */
  const apis: MockInf = {
    "/api/sample": (): void => resJson([{ id: 1 }, { id: 2 }, { id: 3 },]),
    "/api/sample/[0-9]": (): void => {
      var id: number = parseInt(req.url.replace('/api/sample/', ''), 10);
      var datas: any = {
        1: { id: 1, name:'alice',   interval: 1500 },
        2: { id: 2, name:'bob',     interval: 2000 },
        3: { id: 3, name:'charlie', interval:  500 }
      }
      setTimeout(() => resJson(datas[id]), datas[id].interval)
    },
    "/api/example": (): void => { setTimeout(() => resJson({ wait: 1000 }), 1000) },
  };

  const resJson = (json: Object): void => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(json));
    callback();
  }

  /**
   * mock 抽出処理
   */
  return {
    get: (api: string): any => {
      if (apis[api]) {
        return apis[api];
      } else {
        var findApi = Object.keys(apis).find((elm: string): boolean => new RegExp(`^${elm}$`).test(api));
        if (apis[findApi])
          return apis[findApi];
      }
      return void 0;
    },
  };
};

export default Mocks;
