import { createElement } from './feamework';
import { Carousel } from './carousel';


let d = [
  "./image/1.jpeg",
  "./image/2.jpeg",
  "./image/3.jpeg",
  "./image/4.jpg"
]

let a = <Carousel src={d}></Carousel>

a.mountTo(document.body);

