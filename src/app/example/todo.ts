import * as Rx from 'rxjs';
import * as d3 from 'd3';
import * as rxSample from '../rx/sample';
import * as d3Sample from '../d3/sample';

var sample1 = <HTMLDivElement>document.querySelector('.sample1');

const escape = (strHtml: string): string => strHtml.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');

function createElement(node: HTMLElement, htmlTemplate: string): Node {
  var span: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
  span.innerHTML = htmlTemplate;
  node.appendChild(span);
  return span.firstChild;
}

export function init() {
  console.log(1);
  const inputTag = <HTMLInputElement>createElement(sample1, `<input id="todoText" type="text">`);
  createElement(sample1, `<br />`);
  const todoUList = <HTMLUListElement>createElement(sample1, `<ul></ul>`);

  const enterEvent = Rx.Observable.fromEvent(inputTag, 'keydown')
    .filter((key: KeyboardEvent): boolean => key.keyCode === 13);

  // アイテム追加
  const addTodoItem = (): void => {

    var li = <HTMLSpanElement>createElement(todoUList, `<li ></li>`);
    var textContent = inputTag.value;
    // 入力クリア
    inputTag.value = '';

    const spnText = <HTMLSpanElement>createElement(li, `<span>${escape(textContent)}</span>`);

    //削除
    const btnClose = <HTMLInputElement>createElement(li, `<button>削除</button>`);
    const closeClick = Rx.Observable.fromEvent(btnClose, 'click');

    //編集
    const btnEdit = <HTMLInputElement>createElement(li, `<button>編集</button>`);
    const editClick = Rx.Observable.fromEvent(btnEdit, 'click');

    closeClick.subscribe((click: Event) => todoUList.removeChild(li.parentElement));
    editClick.subscribe((click: Event) => {
      //編集モード
      while (li.hasChildNodes()) li.removeChild(li.firstChild);
      const childInput = <HTMLInputElement>createElement(li, `<input type="text" value="${textContent}">`);

      const childTextEvent = Rx.Observable.fromEvent(childInput, 'keydown')
        .filter((key: KeyboardEvent): boolean => key.keyCode === 13);

      childTextEvent
        .subscribe(()=>{
          inputTag.value = childInput.value;
          todoUList.removeChild(li.parentElement);
          addTodoItem();
        })
    });

  };
  
  enterEvent.subscribe(addTodoItem);
}
