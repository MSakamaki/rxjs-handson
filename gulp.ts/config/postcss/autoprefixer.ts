/// <reference path="../../../typings/main.d.ts"/>

import SUPPORT_BROWSERS from './supportBrowser';
import {IAutoprefixer} from './_interfaces';

const SETTING: IAutoprefixer = {
  options: {
    browsers: SUPPORT_BROWSERS,
  },
};

export default SETTING;
