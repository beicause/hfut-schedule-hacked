import cheerio from 'cheerio'


export default (html) => {
  const pageRecordDataList = []

  const $ = cheerio.load(html, { decodeEntities: false })
  const trList = $('.dangrichaxun').find('tr')
  
  trList.each(function (trIndex) {
    if (trIndex === 0 || trIndex === trList.length - 1) {
      return
    }
    // 每条数据
    const recordData = {}
    const tdList = $(this).find('td')
    tdList.each(function (tdIndex) {
      switch (tdIndex) {
        case 0:
          recordData.time = $(this).text()
          break;
        case 3:
          recordData.type = $(this).text()
          break;
        case 4:
          recordData.place = $(this).text().replace(/\s+/g,'')
          break;
        case 5:
          recordData.money = $(this).text()
          break;
        case 6:
          recordData.left = $(this).text()
          break;
      
        default:
          break;
      }
    })
    pageRecordDataList.push(recordData)
  })

  return pageRecordDataList
}
