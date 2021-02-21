import { Timeline, Animation } from './animation'

let t = new Timeline();

t.start();
t.add(new Animation(document.getElementById('el').style, 'transform', 0, 500, 2000, 0, null, v => `translateX(${v}px)`))
const pause = document.getElementById('pause');
pause.addEventListener('click', () => t.pause());
const resume = document.getElementById('resume');
resume.addEventListener('click', () => t.resume());
