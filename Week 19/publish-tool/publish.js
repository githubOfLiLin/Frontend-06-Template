const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const queryString = require('querystring');

const childProcess = require('child_process');


// 单文件

// fs.stat('./index.html', (err, stat) => {
//   // 发送请求
//   let request = http.request({
//     hostname: '127.0.0.1',
//     port: 8082,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/octet-stream',
//       // 有了 Content-Length 之后，请求才会正常结束
//       'Content-Length': stat.size
//     }
//   }, res => {
//     console.log(res);
//   });

//   // 创建可读流
//   const stream = fs.createReadStream('./index.html');

//   // 使用 pipe 将可读流导入到可写流
//   stream.pipe(request);

//   // req 是流式的，加上end才会真正的发送
//   stream.on('end', () => request.end());
// })


// stream.on('data', chunk => {
//   // request其实是一个可写流
//   request.write(chunk);
//   console.log(chunk.toString());
// });

// stream.on('end', (chunk) => {
//   console.log('stream end');
//   // req 是流式的，加上end才会真正的发送
//   request.end(chunk);
// })


// 多文件

// 发送请求
/*let request = http.request({
  hostname: '127.0.0.1',
  port: 8082,
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  }
}, res => {
  console.log(res);
});


const archive = archiver('zip', {
  zlib: { level: 9 }
});
archive.directory('./sample/', false);
archive.finalize();
// archive.pipe(fs.createWriteStream('tem.zip'));
archive.pipe(request);
*/

// 访问 auth 页面
childProcess.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.62558458024b030d`);

// 创建 server，接受 token，点击发布
http.createServer((request, response) => {
  const match = request.url.match(/^\/\?([\s\S]+)$/);
  if (match) {
    const query = queryString.parse(match[1]);
    publish(query.token);
    response.end('');
  }

}).listen(8083);

// publish 路由： 用 token 换取用户信息，检查全权限，接受发布
function publish(token) {
  let request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'POST',
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }, res => {
    console.log(res);
  });
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });
  archive.directory('./sample/', false);
  archive.finalize();
  archive.pipe(request);
  request.end();
}


