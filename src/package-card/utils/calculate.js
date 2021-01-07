
// 这里做真正的分析、分类、计算

import {
  monthsData,
  monthsDays,
  types,
  mainClass,
  recordClass,
  alias,
} from '../assets/recordClass'


export const basicCalculate = (recordDataList) => {
  // basicAnalyzedData 数据结构
  // {
  //   spentSum: 0,
  //   spentTime: 0,
  //   ranking: [
  //     {
  //       index: 0,
  //       name: '',
  //       money: 0,
  //       rate: 0,
  //     }
  //   ],
  //   // 每个月的日均消费
  //   months: []
  //   monthsDaily : []
  // }
  let spentSum = 0
  let spentTime = 0
  let ranking = mainClass.map((name, index) => ({ index, name, money: 0, rate: 0 }))
  const months = ['9月', '10月', '11月', '12月', '1月']
  const monthsMoneySum = months.map(() => 0)

  // 循环recordDataList
  recordDataList.forEach(recordData => {
    const { time, type, place, money } = recordData

    // type为 校园卡消费
    if (type === types[0]) {
      spentSum += money * -1
      spentTime += 1
    }

    // 计算各类别的
    const rankingIndex = recordClass[place]
    // 为空就跳过
    if (rankingIndex === undefined) {
      return
    }
    ranking[rankingIndex] = {
      ...ranking[rankingIndex],
      money: ranking[rankingIndex].money + money * -1,
    }

    // 计算每月消费总计
    const month = time.split('/')[1]
    const monthIndex = monthsData[month]
    monthsMoneySum[monthIndex] = monthsMoneySum[monthIndex] + money * -1

  })

  // 计算每个类别的占比
  ranking = ranking.map(rankingData => ({
    ...rankingData,
    rate: (rankingData.money / spentSum).toFixed(4),
    money: rankingData.money.toFixed(2)
  }))

  // 计算每月的日均
  const monthsDaily = monthsMoneySum.map((money, index) => (money / monthsDays[index]).toFixed(2))

  return {
    spentSum: spentSum.toFixed(2),
    spentTime,
    ranking,
    months,
    monthsDaily,
  }

}

