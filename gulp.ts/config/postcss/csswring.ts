/// <reference path="../../../typings/main.d.ts"/>

import {ICsswring} from './_interfaces';

const SETTING: ICsswring = {
  options: {

    // https://github.com/hail2u/node-csswring#preservehacks
    preserveHacks: true,

    // https://github.com/hail2u/node-csswring#removeallcomments
    removeAllComments: true,
  },
};

export default SETTING;
