/// <reference path="../../../typings/main.d.ts"/>

declare var helper: any;
declare var rxHelper: any;

var helper:any =  (()=>{
  try{
    return (<any>global);
  } catch(e) {
    return (<any>window);
  }
})();

export interface exlectObject {
  frame: number;
  notification: {
    kind: string;
    value: string;
    exception?: any;
    hasValue: number;
  };
}

helper.rxHelper = {
  lpad4: (val: number | string): string => String('    ' + val).slice(-4),
  lpadVal: (val: number | string): string => String('          ' + val).slice(10),
  frameTrace: (actual: Array<exlectObject>, expected: Array<exlectObject>) => {
    var strExp = '', strAct = '';
    expected.forEach((exp: exlectObject, index: number): void => {
      strExp += `${rxHelper.lpad4( exp.frame )}(${rxHelper.lpadVal(exp.notification.value)})[${exp.notification.kind}]-->`;
      strAct += `${rxHelper.lpad4( actual[index].frame )}(${rxHelper.lpadVal(actual[index].notification.value)})[${actual[index].notification.kind}]-->`;
    });
    console.error(`
frame(value)[kind]:
actual  :  ${strAct}
expected:  ${strExp}
`);
  },
  toDeepEqual: (actual: Array<exlectObject>, expected: Array<exlectObject>): boolean | void => {

    if (expected.length !== actual.length) {
      expect(expected.length).toBe(actual.length);
      return;
    }

    expected.forEach((exp: exlectObject, index: number): void => {

      if (exp.frame !== actual[index].frame) {
        expect(exp.frame).toBe(actual[index].frame);
        return rxHelper.frameTrace(actual, expected);
      }

      if (
        exp.notification.kind !== actual[index].notification.kind ||
        exp.notification.value !== actual[index].notification.value ||
        exp.notification.exception !== actual[index].notification.exception ||
        exp.notification.hasValue !== actual[index].notification.hasValue) {
        expect(exp.notification).toEqual(actual[index].notification);
        return rxHelper.frameTrace(actual, expected);
      }
    });
    return true;
  },
};
