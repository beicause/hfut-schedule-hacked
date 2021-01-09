
// 这里做真正的分析、分类、计算

import {
  monthsData,
  monthsDays,
  types,
  mainClass,
  // alias,
} from '../assets/recordClass'


// 账单首页数据

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
    const { time, type, classIndex, money } = recordData

    // type为 校园卡消费
    if (type === types[0]) {
      spentSum += money * -1
      spentTime += 1
    }

    // 计算各类别的
    // 为空就跳过
    if (classIndex === undefined) {
      return
    }
    ranking[classIndex] = {
      ...ranking[classIndex],
      money: ranking[classIndex].money + money * -1,
    }

    // 计算每月消费总计
    const month = time.split('/')[1]
    const monthIndex = monthsData[month]
    monthsMoneySum[monthIndex] = monthsMoneySum[monthIndex] + money * -1

  })

  // 计算每个类别的占比
  ranking = ranking.map(rankingData => ({
    ...rankingData,
    rate: (100 * rankingData.money / spentSum).toFixed(2),
    money: rankingData.money.toFixed(2),
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


// 消费排行榜数据

// 以下格式为：#代号(rankingID)# #类别#
export const rankingIDDic = [
  {
    ID: 0,
    name: '全部-单次消费',
    type: '单次',
  },
  {
    ID: 1,
    name: '食堂-单次消费',
    type: '单次',
  },
  {
    ID: 2,
    name: '购物-单次消费',
    type: '单次',
  },
  {
    ID: 3,
    name: '其他-单次消费',
    type: '单次',
  },
  {
    ID: 4,
    name: '食堂-按食堂分类',
    type: '分类',
  },
  {
    ID: 5,
    name: '购物-按商户分类',
    type: '分类',
  },
]

export const sortTypeDic = [
  {
    type: 0,
    name: '降序',
  },
  {
    type: 1,
    name: '升序',
  },
]
// 0 全部-单次消费
// 1 食堂-单次消费
// 2 购物-单次消费
// 3 其他-单次消费
// 4 食堂-大类（食堂）分类
// 5 购物-大类（商户）分类

// 单次分类，取100显示，每条带上消费时间
// 大类分类，取全部显示，每条带上大类占比

// sortType = 0 正序
// sortType = 1 倒序

export const rankingCalculate = (recordDataList, rankingID, sortType) => {
  let legalList = []

  // 单次分类
  if (rankingIDDic[rankingID].type === '单次') {
    switch (rankingID) {
      // 返回全部排序
      case 0:
        legalList = recordDataList
        break

      // 返回食堂-单次消费排序
      case 1:
        legalList = recordDataList.filter(function (a) {
          return a.classIndex === 0
        })
        break

      // 返回购物-单次消费排序
      case 2:
        legalList = recordDataList.filter(function (a) {
          return a.classIndex === 1
        })
        break

      // 返回购物-单次消费排序
      case 3:
        legalList = recordDataList.filter(function (a) {
          return a.classIndex === 4
        })
        break

      default:
        break;
    }

    // 返回
    if (sortType === 0) {
      return legalList.sort(function (a, b) {
        return a.money - b.money
      }).slice(0, 100)
    } else {
      return legalList.sort(function (a, b) {
        return b.money - a.money
      }).slice(0, 100)
    }
  }


  // 大类分类
  else {
    switch (rankingID) {
      // 返回食堂-分类消费排序
      case 4:
        legalList = recordDataList.filter(function (a) {
          return a.classIndex === 0
        })
        break

      // 返回购物-分类消费排序
      case 5:
        legalList = recordDataList.filter(function (a) {
          return a.classIndex === 1
        })
        break

      default:
        break;
    }

    // 计算总数
    let sumMoney = 0
    const sumData = {}
    legalList.forEach(recordData => {
      sumMoney += recordData.money * -1
      if (!sumData[recordData.place]) {
        sumData[recordData.place] = recordData.money * -1
      } else {
        sumData[recordData.place] = sumData[recordData.place] + recordData.money * -1
      }
    })

    const rateList = []
    for (const place in sumData) {
      rateList.push({
        place,
        money: sumData[place].toFixed(2),
        rate: (100 * sumData[place] / sumMoney).toFixed(2),
      })
    }

    // 返回
    if (sortType === 1) {
      return rateList.sort(function (a, b) {
        return a.rate - b.rate
      }).slice(0, 100)
    } else {
      return rateList.sort(function (a, b) {
        return b.rate - a.rate
      }).slice(0, 100)
    }
  }
}


// 计算自定义分析

// 共8类自定义分析
// 0 - 日均消费
// 1 - 食堂排名
// 2 - 吃饭平均花销
// 3 - 吃饭平均时间
// 4 - 打水
// 5 - 丢卡
// 6 - 洗澡频率
// 7 - 洗澡花销

export const customCalculate = (recordDataList, basicAnalyzedData) => {
  const customedData = []

  // 计算日均消费
  let monthAvgSum = 0
  basicAnalyzedData.monthsDaily.forEach(money => {
    monthAvgSum += money
  });
  customedData.push((monthAvgSum / 5).toFixed(2))

  // 计算食堂排名
  customedData.push(rankingCalculate(recordDataList, 4, 0).slice(0, 5))

  // 计算吃饭平均花销，和时间
  // 听说这个算法价值2亿
  const mealList = {
    breakfast: [],
    lunch: [],
    dinner: [],
  }
  recordDataList.forEach(recordData => {
    // 不是食堂类，跳过
    if (recordData.classIndex !== 0) {
      return true
    }

    const [date, time] = recordData.time.split(' ')
    const [year, month, day] = date.split('/')
    const [hour, minute] = time.split(':')
    let lastMeal = {}
    let mealType = ''
    if (hour > 0 && hour <= 9) {
      mealType = 'breakfast'
      lastMeal = mealList.breakfast[mealList.breakfast.length - 1]
    }
    else if (hour > 9 && hour <= 14) {
      mealType = 'lunch'
      lastMeal = mealList.lunch[mealList.lunch.length - 1]
    }
    else if (hour > 14 && hour <= 20) {
      mealType = 'dinner'
      lastMeal = mealList.dinner[mealList.dinner.length - 1]
    }
    else {
      // 晚上九点之后就不算晚饭了
      return true
    }
    // 创建当前meal对象
    const meal = {
      year,
      month,
      day,
      hour,
      minute,
      mealType,
      money: recordData.money * -1
    }
    // 判断和上一条记录是否是同一天，且时间段相同
    if (lastMeal && year === lastMeal.year && month === lastMeal.month && day === lastMeal.day && mealType === lastMeal.mealType) {
      // 都相同，那就是同一顿饭
      mealList[mealType][mealList[mealType].length - 1] = {
        ...lastMeal,
        money: lastMeal.money + meal.money
      }
    }
    // 不是同一顿饭，直接加上
    else {
      mealList[mealType].push(meal)
    }
  })

  // 计算早中晚饭的花费合计
  let breakfastMoney = 0
  let lunchMoney = 0
  let dinnerMoney = 0
  mealList.breakfast.forEach(meal => breakfastMoney += meal.money)
  mealList.lunch.forEach(meal => lunchMoney += meal.money)
  mealList.dinner.forEach(meal => dinnerMoney += meal.money)

  customedData.push({
    total: {
      number: mealList.breakfast.length + mealList.lunch.length + mealList.dinner.length,
      money: ((breakfastMoney + lunchMoney + dinnerMoney) / (mealList.breakfast.length + mealList.lunch.length + mealList.dinner.length)).toFixed(2),
    },
    breakfast: {
      number: mealList.breakfast.length,
      money: (breakfastMoney / mealList.breakfast.length).toFixed(2),
    },
    lunch: {
      number: mealList.lunch.length,
      money: (lunchMoney / mealList.lunch.length).toFixed(2),
    },
    dinner: {
      number: mealList.dinner.length,
      money: (dinnerMoney / mealList.dinner.length).toFixed(2),
    },
  })

  // 计算早中晚饭的平均时间
  let breakfastTimeTotal = 0
  let lunchTimeTotal = 0
  let dinnerTimeTotal = 0
  mealList.breakfast.forEach(meal => breakfastTimeTotal += (meal.hour * 60 + meal.minute * 1))
  mealList.lunch.forEach(meal => lunchTimeTotal += (meal.hour * 60 + meal.minute * 1))
  mealList.dinner.forEach(meal => dinnerTimeTotal += (meal.hour * 60 + meal.minute * 1))

  const breakfastAvgTime = ((breakfastTimeTotal / mealList.breakfast.length) / 60).toFixed(2)
  let breakfastMinte = parseInt(String(breakfastAvgTime).split('.')[1] * 0.6)
  breakfastMinte = parseMinute(breakfastMinte)

  const lunchAvgTime = ((lunchTimeTotal / mealList.lunch.length) / 60).toFixed(2)
  let lunchMinte = parseInt(String(lunchAvgTime).split('.')[1] * 0.6)
  lunchMinte = parseMinute(lunchMinte)

  const dinnerAvgTime = ((dinnerTimeTotal / mealList.dinner.length) / 60).toFixed(2)
  let dinnerMinte = parseInt(String(dinnerAvgTime).split('.')[1] * 0.6)
  dinnerMinte = parseMinute(dinnerMinte)

  customedData.push({
    breakfast: parseInt(breakfastAvgTime) + ':' + breakfastMinte,
    lunch: parseInt(lunchAvgTime) + ':' + lunchMinte,
    dinner: parseInt(dinnerAvgTime) + ':' + dinnerMinte,
  })
  


  return customedData


}


const parseMinute = (minute) => {
  if (minute < 10) {
    return '0' + minute
  } else {
    return minute
  }
}

