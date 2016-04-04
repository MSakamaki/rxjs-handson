import * as d3 from 'd3';
import * as Rx from 'rxjs';

import {dragAndDropObserve} from '../rx/sample';

/* istanbul ignore next */
export function sample1() {

  var g = d3.selectAll('.sample1');
  let svg = g.append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .attr('class', 'fr__sample__svg');

  // svg render
  svg
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .style("fill", "purple")
    .attr('class', 'fr__sample-circle');

  svg
    .append("text")
    .attr('x', 5)
    .attr('y', 32)
    .attr('font-size', 20)
    .attr('fill', 'red')
    .text('FOO')
    .attr('class', 'fr__sample-text');
}

export function reWriteCircle(x: number, y: number) {
  /** get d3 object */
  var circle = d3.select('.fr__sample-circle');
  var test = d3.select('.fr__sample-text');

  circle
    .attr("cx", x)
    .attr("cy", y);

  test
    .attr("x", x - 20)
    .attr("y", y + 10);
}

export function changeCircleColor(color: string) {
  var circle = d3.select('.fr__sample-circle');
  circle.style('fill', color);
}

/** ランダムな位置に文字を出力 */
export function createRundomText(id: number, name: string, color?: string): void {
  console.log('drowing text', color, id, name);
  const svg: d3.Selection<any> = d3.select('.fr__sample__svg');
  svg
    .append("text")
    .attr('x', (Math.random() * 200) + 120)
    .attr('y', (Math.random() * 400) + 20)
    .attr('font-size', 20)
    .attr('fill', color || 'blue')
    .text(`(${id}):${name}`);
}