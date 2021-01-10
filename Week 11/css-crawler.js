
// TODO:爬虫，将standards爬出来放到数组中
let iframe = document.createElement('iframe');
document.body.innerHTML = '';
document.body.appendChild(iframe);
function happen(element, event) {
  return Promise(resolve => {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    }
    element.addEventListener(event, handler);
  });
}

void async function () {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, 'load');
    console.log(iframe.contentDocument.querySelectorAll('.propdef'));
  }
}();