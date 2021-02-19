let element = document.documentElement;



// let handler;
// let startX, startY;
// let isPan = false, isTap = true, isPress = false;

export class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties, point) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}


export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false;
    let contexts = new Map();

    // mousedown不触发的时候也可以触发 mousemove
    element.addEventListener('mousedown', event => {
      let context = Object.create(null);
      contexts.set("mouse" + (1 << event.button), context);
      recognizer.start(event, context);
      let onMousemove = event => {
        let button = 1;
        while (button <= event.buttons) {
          // 掩码
          if (button & event.buttons) {
            let key;
            // 中键和右键与正常的button顺序相反
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            } else {
              key = button;
            }
            let context = contexts.get("mouse" + key);
            recognizer.move(event, context);
          }
          button = button << 1;
        }

      }
      let onMouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        recognizer.end(event, context);
        contexts.delete("mouse" + (1 << event.button));
        if (event.buttons === 0) {
          element.removeEventListener("mousemove", onMousemove);
          element.removeEventListener("mouseup", onMouseup);
          isListeningMouse = false;
        }

      }
      if (!isListeningMouse) {
        element.addEventListener("mousemove", onMousemove);
        element.addEventListener("mouseup", onMouseup);
        isListeningMouse = true;
      }
    })
    // touchmove 在 touchstart 之后一定会触发，且一定在touchstart之后触发
    element.addEventListener("touchstart", event => {
      for (let touch of event.changedTouches) {
        const context = Object.create(null);
        contexts.set(touch.identifier, context);
        recognizer.start(touch, context);
      }
    });
    element.addEventListener("touchmove", event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        recognizer.move(touch, context);
      }
    });
    element.addEventListener("touchend", event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        recognizer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });

    // 触屏事件异常结束会触发 touchcancel,比如被alert打断
    element.addEventListener("touchcancel", event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        recognizer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) { this.dispatcher = dispatcher; }
  start(point, context) {
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;

    context.handler = setTimeout(() => {
      context.isPan = false;
      context.isTap = false;
      context.isPress = true;
      context.handler = null;
      this.dispatcher.dispatch("press", {});
    }, 500)
  }

  move(point, context) {
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;
    context.isVertical = Math.abs(dx) < Math.abs(dy);
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
      clearTimeout(context.handler);
    }

    this.dispatcher.dispatch("pan", {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical
    });
    // 只取5ms之内的点做速度计算
    context.points = context.points.filter(point => Date.now() - point.t < 500);
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    });
  }


  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch("tap", {});
      clearTimeout(context.handler);
    }
    else if (context.isPress) {
      this.dispatcher.dispatch("pressEnd", {});
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500);
    let v;
    if (!context.points.length) {
      v = 0;
    } else {
      const d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
      v = d / (Date.now() - context.points[0].t);
    }
    if (v > 1.5) {
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }
    if (context.isPan) {
      this.dispatcher.dispatch("panEnd", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      });
    }
  }

  cancel(point, context) {
    clearTimeout(context.handler);
    this.dispatcher.dispatch("panEnd", {});
  }

}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}