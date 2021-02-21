import { createElement } from './feamework';
import { Carousel } from './Carousel';
import { Button } from './Button';
import { List } from './List';


let d = [
  "./image/1.jpeg",
  "./image/2.jpeg",
  "./image/3.jpeg",
  "./image/4.jpg"
]

let a = <Carousel src={d}
  onChange={event => console.log('position', event.detail.position)}
  onClick={event => window.location.href = event.detail.data}
></Carousel>

a.mountTo(document.body);

let b = <Button>
  content
</Button>

b.mountTo(document.body);

let c = <List data={d}>
  {record => <div>
    <img src={record} />
  </div>}
</List>
c.mountTo(document.body);
