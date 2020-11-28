import dayjs from 'dayjs'

import semesterData from '../assets/data/semesterData'
import { currentSemester } from '../config/config.default'


export default (semesterId) => {
  const daysZh = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  let startDate = '2020/09/07'  // 默认值
  // 获取学期的起始日期
  for (const singleSD of semesterData) {
    if (singleSD.id === (semesterId || currentSemester.id)) {
      startDate = singleSD.startDate
    }
  }

  // 总共20周
  let weekIndexes = []
  for (let i = 0; i < currentSemester.weekNumber; i++) {
    weekIndexes.push(i)
  }

  let travelMoment = dayjs(startDate)
  travelMoment = travelMoment.subtract(1, 'd')  // 减去一天
  const currentMoment = dayjs()

  let currentWeekIndex = 0

  const dayLineMatrix = weekIndexes.map((weekIndex) => {
    return daysZh.map((dayZh) => {
      travelMoment = travelMoment.add(1, 'd')
      const today = currentMoment.format('MM/DD') == travelMoment.format('MM/DD')
      if (today) {
        currentWeekIndex = weekIndex
      }
      return {
        dayZh,
        dateZh: travelMoment.format('YYYY/MM/DD'),
        today,
      }
    })
  })

  return {
    dayLineMatrix,
    currentWeekIndex,
  }

}