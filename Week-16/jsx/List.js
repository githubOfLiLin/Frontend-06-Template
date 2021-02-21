import { Component, ATTRIBUTES, createElement } from './feamework';


export class List extends Component {
  constructor() {
    super();
  }

  render() {
    this.children = this[ATTRIBUTES].data.map(this.template);

    this.root = (<div>{this.children}</div>).render();
    return this.root;
  }
  appendChild(child) {
    this.template = child;
    this.render();
  }
}