/// <reference path="../../../typings/main.d.ts"/>

import Example from '../po/example.po';

describe('suite', () => {
  it('spec', (done: Function) => {

    const example: Example = new Example();

    browser.get('http://localhost:9000/develop.html')
      .then(() => example.verification())
      .then(() => expect(example.text.getText()).toBe('FOO'))
      .then(() => done());
  });
});