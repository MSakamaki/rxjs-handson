
import * as rxSample from './rx/sample';
import * as d3Sample from './d3/sample';
import * as example from './example/sample';

import './main.css!'

var myApp:any ={
  rx: rxSample,
  d3: d3Sample,
  exec: example.exec,
};

/** global api publish */
(<any>window).mainApp = myApp;

/** export api */
export var rx = myApp.rx;
export var d3 = myApp.d3;
export var exec = example.exec;
