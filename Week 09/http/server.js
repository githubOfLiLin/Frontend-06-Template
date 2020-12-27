const http = require('http');
http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    console.error(errr);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log('body:', body);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<html lang="en">

    <head>
      <title>Document</title>
    </head>
    <style>
      body {
        background-color: pink;
      }
    
    </style>
    
    <body>
      hello word
    </body>
    
    </html>`);
  })
}).listen('8088');

console.log('server start');

