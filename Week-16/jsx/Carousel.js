import { Component, STATE, ATTRIBUTES } from './feamework';
import { enableGesture } from '../gesture/gesture';
import { Timeline, Animation } from './animation';
import { ease } from './ease';

export class Carousel extends Component {
  constructor() {
    super();
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let record of this[ATTRIBUTES].src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }
    this[STATE].position = 0;

    let t = 0; //动画开始的时间
    let ax = 0;// 动画产生的位移；
    let handler = null;

    const children = this.root.children;
    enableGesture(this.root);
    let timeline = new Timeline();
    timeline.start();

    this.root.addEventListener('start', event => {
      console.log('start');
      timeline.pause();
      clearInterval(handler);
      let progress = (Date.now() - t) / 500;
      ax = ease(progress) * 500 - 500;
    });
    // TODO
    this.root.addEventListener('tap', event => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTES].src[this[STATE].position],
        position: this[STATE].position
      });
    });

    this.root.addEventListener('pan', event => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`
      }
    });

    this.root.addEventListener('end', event => {

      timeline.reset();
      timeline.start();
      handler = setInterval(nextPicture, 3000);


      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);

      let direction = Math.round((x % 500) / 500);
      if (event.isFlick) {
        console.log('velocity', event.velocity);
        if (event.velocity < 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;
        console.log('end', children.length);

        children[pos].style.transition = "none";

        timeline.add(new Animation(children[pos].style, 'transform',
          -pos * 500 + offset * 500 + x % 500,
          -pos * 500 + offset * 500 + direction * 500, 500, 0, ease, v => `translateX(${v}px)`));
      }
      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
      this.triggerEvent('change', { position: this[STATE].position });
    });

    // 自动播放
    let nextPicture = () => {
      console.log('setInterval');
      const children = this.root.children;

      let nextIndex = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];
      let next = children[nextIndex];

      t = Date.now();

      timeline.add(new Animation(current.style, 'transform',
        -this[STATE].position * 500, -500 - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`));

      timeline.add(new Animation(next.style, 'transform',
        500 - nextIndex * 500, - nextIndex * 500, 500, 0, ease, v => `translateX(${v}px)`));
      this.triggerEvent('Change', { position: this[STATE].position });
      this[STATE].position = nextIndex;
    }

    handler = setInterval(nextPicture, 3000);

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}