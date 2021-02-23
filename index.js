// function getFileMD5(path:string): Promise<string> {
//   let readStream = fs.createReadStream(path);
//   return new Promise((resolve, reject)=>{
//     readStream.on('data', function (chunk) {
//       md5Hash.update(chunk);
//     }).on('end', function () {
//       resolve(md5Hash.digest('hex'));
//     }).on('error', function(err){
//       reject(err.message);
//     });
//   });
// }
const fs = require('fs');
const crypto = require('crypto');

// try {
//   let md5Hash = crypto.createHash('MD5');
//   let readStream = fs.createReadStream('/Users/lilin/Desktop/libs/0cc21ce8-f16c-11e9-9f12-0242ac120003/e0ce704e-703d-418f-96f2-da70dffaf5d7/libs/zs_1.0_2bc44b20-734e-11eb-8581-c7238c49c082.zip');

//   let content = '';
//   readStream.on('data', function (chunk) {
//     // content += chunk;
//     md5Hash.update(chunk);
//   }).on('end', function () {
//     // resolve(md5Hash.digest('hex'));
//     console.log(md5Hash.digest('hex'));
//   });
// } catch (err) {
//   console.log('err', err);
// }

let md5Hash = crypto.createHash('MD5');

// md5Hash.update('word');
// console.log(md5Hash.digest('hex'));

var buffer = fs.readFileSync('/Users/lilin/Desktop/libs/0cc21ce8-f16c-11e9-9f12-0242ac120003/e0ce704e-703d-418f-96f2-da70dffaf5d7/libs/zs_1.0_2bc44b20-734e-11eb-8581-c7238c49c082.zip');
var fsHash = crypto.createHash('md5');
console.log('buffer', buffer);
fsHash.update(buffer);
var md5 = fsHash.digest('hex');
console.log(md5);
