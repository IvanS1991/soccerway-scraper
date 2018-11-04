import { JSDOM } from 'jsdom';

export class DOM {
  constructor (private document: HTMLDocument) {}

  public selectElementArray (selector: string): Element[] {
    return this.getElementArray(this.document.querySelectorAll(selector));
  }

  public getElementArray (elementArray: NodeListOf<Element> | HTMLCollection): Element[] {
    return Array.from(elementArray);
  }

  public getAttributeOf(selector: string, attr: string, parent?: Element | HTMLDocument) {
    parent = parent || this.document;

    return parent.querySelector(selector).getAttribute(attr);
  }
}

export const getDOMDocument = (htmlData: string): DOM => {
  const dom: JSDOM = new JSDOM(htmlData, {});
  const window: Window = dom.window;
  const document: HTMLDocument = window.document;

  return new DOM(document);
};