import { Component, createElement } from './feamework';

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    console.log('attributes', this.attributes);
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }
    /*let currentIndex = 0;
    setInterval(() => {
      const children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;
      let current = children[currentIndex];
      let next = children[nextIndex];
      next.style.transition = "none";
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
      setTimeout(() => {
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        next.style.transform = `translateX(${- nextIndex * 100}%)`;
        currentIndex = nextIndex;
      }, 16)

    }, 3000)*/

    // 在mousedown里绑定mousemove和mouseup事件，在mouseup里接触mousemove和mouseup事件，是拖拽的常用事件绑定手法
    let position = 1;
    this.root.addEventListener('mousedown', (event) => {

      let startX = event.clientX;
      const move = (event) => {
        console.log('mousemove');
        let x = event.clientX - startX;
        for (let child of this.root.children) {
          child.style.transform = `translateX(${x}px)`;
        }
      }

      const up = () => {
        console.log('mouseup');
        let x = event.clientX - startX;
        console.log('x', x);
        let children = this.root.children;
        position = position % children.length - Math.round(x / 500);
        for (let child of children) {
          child.style.transform = `translateX(${- position * 100}%)`;
        }
        position++;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }

      // 在 document 上监听的另一个好处：即使鼠标移除了浏览器，仍然可以监听到document上的事件
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    })

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "./image/1.jpeg",
  "./image/2.jpeg",
  "./image/3.jpeg",
  "./image/4.jpg"
]

let a = <Carousel src={d}></Carousel>

a.mountTo(document.body);

