/// <reference path="../../../typings/main.d.ts"/>

import SUPPORT_BROWSERS from './supportBrowser';
import {IDoiuse} from './_interfaces';

const SETTING: IDoiuse = {
  options: {
    browsers: SUPPORT_BROWSERS,
  },
};

export { SETTING as default };
