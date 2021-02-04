
const alphaList = 'abcdefghijklmnopqrstuvwxyz'.split('')

const myEncrypt = (code) => {
  const str1 = code.slice(0, 3).split('')
  const str2 = code.slice(3, 6).split('')
  const str3 = code.slice(6, 9).split('')
  const str4 = code.slice(9, 10).split('')

  let secret = ''

  const K = (c, p) => alphaList[parseInt(c) + p]

  // 头部三个随机
  for (let i = 0; i < 3; i++) {
    secret += alphaList[parseInt(Math.random() * alphaList.length)]
  }

  str1.forEach(c => {
    secret += K(c, 0)
  });

  str2.forEach(c => {
    secret += K(c, 3)
  });

  str3.forEach(c => {
    secret += K(c, 7)
  });

  str4.forEach(c => {
    secret += K(c, 1)
  });

  // 尾部随机
  for (let i = 0; i < parseInt(Math.random() * alphaList.length); i++) {
    secret += alphaList[parseInt(Math.random() * alphaList.length)]
  }

  return secret
}

// console.log(myEncrypt('2019217721'))
export default myEncrypt
