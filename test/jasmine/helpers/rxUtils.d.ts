/// <reference path="../../../typings/main.d.ts" />
export interface exlectObject {
    frame: number;
    notification: {
        kind: string;
        value: string;
        exception?: any;
        hasValue: number;
    };
}
