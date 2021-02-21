import { Component, createElement } from './feamework';


export class Button extends Component {
  constructor() {
    super();
  }

  render() {
    this.container = <span />;
    this.root = (<div >{this.container}</div>).render();
    return this.root;
  }
  appendChild(child) {
    if (!this.container) {
      this.render();
    }
    this.container.appendChild(child);
  }
}