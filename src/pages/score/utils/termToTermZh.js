
export default (term) => {
  let termZh = ''
  
  switch (String(term)) {
    case '20202':
      termZh = '2020-2021学年第二学期'
      break;
    case '20201':
      termZh = '2020-2021学年第一学期'
      break;
    case '20192':
      termZh = '2019-2020学年第二学期'
      break;
    case '20191':
      termZh = '2019-2020学年第一学期'
      break;
    case '20182':
      termZh = '2018-2019学年第二学期'
      break;
    case '20181':
      termZh = '2018-2019学年第一学期'
      break;
    case '20172':
      termZh = '2017-2018学年第二学期'
      break;
    case '20171':
      termZh = '2017-2018学年第一学期'
      break;
    case '20162':
      termZh = '2016-2017学年第二学期'
      break;
    case '20161':
      termZh = '2016-2017学年第一学期'
      break;
  
    default:
      break;
  }

  return termZh
}
