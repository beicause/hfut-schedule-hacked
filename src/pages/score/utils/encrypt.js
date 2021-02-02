// eslint-disable-next-line import/no-commonjs
var crypto = require('crypto'); 

function aesEncrypt(data) {
  let secretKey = 'XhblzW66'
  let iv = '1111111111111111'
  secretKey = new Buffer(secretKey, "utf8");
  secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
  secretKey = new Buffer(secretKey, "hex");
  var cipher = crypto.createCipheriv("aes-128-cbc", secretKey, iv), coder = [];
  coder.push(cipher.update(data, "utf8", "hex"));
  coder.push(cipher.final("hex"));
  return coder.join("");
 }

// console.log(cbcEncrypt('2018214008'))

export default aesEncrypt
