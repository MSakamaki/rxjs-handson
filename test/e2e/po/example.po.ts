/// <reference path="../../../typings/main.d.ts"/>


export default class Sample {

  private sample: protractor.ElementFinder;
  public svg: protractor.ElementFinder;
  public text: protractor.ElementFinder;
  constructor() {
    this.sample = element(by.css('.sample1'));
    this.svg = this.sample.element(by.tagName('svg'));
    this.text = this.sample.element(by.tagName('text'))
  }
  verification(): webdriver.promise.Promise<any> {
    return browser.wait((): Promise<any> => {
      return Promise.all([
        ()=> this.sample.isPresent(),
        ()=> this.svg.isPresent(),
        ()=> this.text.isPresent(),
      ]);
    });
  }
}

