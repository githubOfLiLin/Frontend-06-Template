/**
 三种实现动画帧的方式
 * 
*/
/*
// 不可控，并不一定会16毫秒一定执行，而且可能会发生积压
setInterval(() => { }, 16)

// 在上一帧的执行过之后，再去执行下一帧
let tick = () => {

  // do somthing
  setTimeout(tick, 16);
}

// 在上一帧的执行过之后，再去执行下一帧
let tick = () => {
  // do somthing
  // 不需要写时间，requestAnimationFrame指请求浏览器的下一帧
  requestAnimationFrame(tick);
}
*/

const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handel');
const ANIMATIONS = Symbol('animations');
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');

export class Timeline {
  constructor() {
    // 在类外部使用常量且使用Symbol来定义类属性的键值，可以使其在类外部永远无法被访问
    this.startTime = 0;
    this[TICK] = () => {
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        let t;
        /**  在 start 之后添加动画 **/
        if (this[START_TIME].get(animation) < this.startTime) {
          // 经过的时间等于当前时间减动画开始时间减暂停的所有时间
          t = now - this.startTime - this[PAUSE_TIME] - animation.delay;
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        }
        /**  在 start 之后添加动画 **/
        if (animation.duration < t) {
          t = animation.duration;
          this[ANIMATIONS].delete(animation);
        }
        if (t > 0)
          animation.receiveTime(t);
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    }
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_START] = 0;
    this[PAUSE_TIME] = 0;
    // 加上状态，防止乱调start\paused\resume\reset
    this.state = "Inited";
  }
  // 开启动画
  start() {
    if (this.state !== "Inited")
      return;
    this.state = "started";
    this.startTime = Date.now();
    this[TICK]();
  }

  // 暂停
  pause() {
    if (this.state !== "started")
      return;
    this.state = "paused";
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  // 恢复
  resume() {
    if (this.state !== "paused")
      return;
    this.state = "resumed";
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  // 重启动画
  reset() {
    this.pause();
    this.state = "Inited";
    this.startTime = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_START] = 0;
    this[PAUSE_TIME] = 0;
    this[TICK_HANDLER] = null;

  }

  add(animation, startTime) {
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime || Date.now());
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction || (v => v);
    this.delay = delay;
    this.template = template || (v => v);
  }
  receiveTime(time) {
    console.log('time', time);
    const range = this.endValue - this.startValue;
    const progress = this.timingFunction(time / this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress);
  }
}
