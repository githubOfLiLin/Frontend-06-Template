const http = require('http');
const https = require('https');
const fs = require('fs');
const unzipper = require('unzipper');
const queryString = require('querystring');

const outFile = fs.createWriteStream('../server/public/temp.zip');
// req.on('data', chunk => {
//   outFile.write(chunk);
//   console.log(chunk.toString());
// });
// req.on('end', chunk => {
//   outFile.write(chunk);
//   outFile.end();
//   res.end('success');
// });

// 使用 pipe 将可读流导入到可写流
// req.pipe(unzipper.Extract({ path: '../server/public/' }));
// req.on('end', () => {
//   // outFile.end();
//   res.end('success');
//   console.log('success');
// })

// createServer
http.createServer((req, res) => {
  // 走到这里表示客户端的请求已经发送结束
  console.log(req.headers);
  if (req.url.match(/^\/auth/)) {
    console.log('auth');
    return auth(req, res);
  }
  if (req.url.match(/^\/publish/)) {
    console.log('publish');
    return publish(req, res);
  }
}).listen(8082);

// auth 路由请求下：接收 code，使用 code+client_id+client_secret 换 token
async function auth(req, response) {
  let query = queryString.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  console.log(query);
  const tokenData = await getToken(query.code);
  console.log('tokenData', tokenData);
  // response.write(JSON.stringify(tokenData));
  response.write(`<a href='http://localhost:8083/?token=${tokenData['access_token']}'>publish</a>`)
  response.end();
}

// publish 路由： 用 token 换取用户信息，检查全权限，接受发布
async function publish(request, response) {
  let query = queryString.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  if (query.token) {
    const info = await getUser(query.token);
    if (info.login === 'lilin') {
      request.pipe(unzipper.Extract({ path: '../server/public/' }));
      request.on('end', () => {
        response.end('');
      });
    }
  }

}

function getToken(code) {
  return new Promise((resolve, reject) => {
    let request = https.request({
      hostname: 'github.com',
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.62558458024b030d&client_secret=02afd9d544aa6339dc4450dbfc21a3991d483f01`,
      port: 443,
      method: 'POST'
    }, (res) => {
      let body = '';
      res.on('data', chunk => {
        body += chunk.toString();
      });
      res.on('end', chunk => {
        resolve(queryString.parse(body));
      });
    })
    request.end();
  })
}

function getUser(token) {
  return new Promise((resolve, reject) => {
    let request = https.request({
      hostname: 'github.com',
      path: `/user`,
      port: 443,
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'sample-publish'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => {
        body += chunk.toString();
      });
      res.on('end', chunk => {
        resolve(body);
      });
    })
    request.end();
  })
}