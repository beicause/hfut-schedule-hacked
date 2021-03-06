import _ from 'lodash'
import Taro from '@tarojs/taro'
import { currentSemester } from '../config/config.default'

export const themeColors = [
  // 默认
  [
    { name: '蓝', value: 'blue' },
    { name: '深蓝', value: 'darkBlue' },
    { name: '红', value: 'red' },
    { name: '黄', value: 'yellow' },
    { name: '绿', value: 'green' },
    { name: '灰', value: 'gray' },
    { name: '深灰', value: 'darkGray' },
    { name: '棕', value: 'brown' },
    { name: '橙', value: 'orange' },
    { name: '紫', value: 'purple' },
  ],
  // 活泼
  [
    { name: '亮蓝', value: 'blue' },
    { name: '蓝', value: 'darkBlue' },
    { name: '红', value: 'red' },
    { name: '粉', value: 'pink' },
    { name: '亮黄', value: 'gold' },
    { name: '黄', value: 'yellow' },
    { name: '绿', value: 'green' },
    { name: '橙', value: 'orange' },
    { name: '紫', value: 'purple' },
  ],
  // 莫兰迪
  [
    { name: '灰蓝', value: 'blue' },
    { name: '雪青', value: 'purple' },
    { name: '粉红', value: 'red' },
    { name: '姜黄', value: 'yellow' },
    { name: '灰豆绿', value: 'green' },
    { name: '烟灰粉', value: 'pink' },
    { name: '黄栌', value: 'orange' },
    { name: '灰', value: 'grey' },
    { name: '驼色', value: 'brown' },
  ],
  // 罗时锴
  [
    { name: '马卡龙', value: 'blue' },
    { name: '葡萄', value: 'purple' },
    { name: '芋泥', value: 'red' },
    { name: '半熟芝士', value: 'yellow' },
    { name: '抹茶', value: 'green' },
    { name: '覆盆子', value: 'pink' },
    { name: '甜瓜', value: 'orange' },
    { name: '蓝莓', value: 'blue2' },
    { name: '牛油果', value: 'green2' },
  ],
]

// 主函数
export default (scheduleData, lessonIds, timeTable) => {

  // 初始化moocData
  const moocData = []

  // 初始化scheduleMatrix
  let scheduleMatrix = []
  for (let i = 0; i < currentSemester.weekNumber; i++) {
    scheduleMatrix.push([0, 1, 2, 3, 4, 5, 6].map(() => ([[], [], [], [], [], [], [], [], [], [], []])))
  }

  // 生成一个空scheduleMatrix
  if (!scheduleData) {
    scheduleMatrix.map((weekData) => {
      weekData.map((dayData) => {
        dayData.map((courseBoxList) => {
          if (courseBoxList.length === 0) {
            courseBoxList.push({})
          }
        })
      })
    })
    return { scheduleMatrix }
  }

  // 给每个课程分配颜色
  const lessonIdsColor = initLessonIdsColor(lessonIds)

  // 遍历scheduleData，填充scheduleMatrix
  scheduleData.map((lessonInfo) => {
    // course：(Object)课程数据
    // text：(String)该门课具体在星期几、教室信息、授课老师
    // lessonId:：课程id
    // remark：判断是不是慕课
    const {
      course: {
        nameZh: name,
        credits: credits,
      },
      scheduleText: { dateTimePlacePersonText: { text } },
      id: lessonId,
      nameZh: studentClazzes,
      code: lessonCode,
      remark: remark,
      stdCount: studentNumber,
      courseType: { nameZh: lessonType },
      scheduleWeeksInfo: weekIndexesZh,
      campus: { nameZh: campus },
      openDepartment: { abbrZh: openDepartment },
      semester: { id: semesterId, code: semestercode }

    } = lessonInfo

    // 先生成moocData（慕课的）
    if (remark && remark.indexOf('慕课') !== -1) {
      moocData.push({
        name,
        lessonCode,
        credits,
        info: remark,
        lessonType,
        openDepartment,
      })
    }

    if (!text) { return } // 没有课程安排，跳过


    // 再生成scheduleMatrix
    text.split('\n').map((splitdText) => {

      // 教室、老师
      let clazzRoom = ''
      let teacher = ''
      const splitdSpace = splitdText.split(' ')
      if (splitdSpace.length >= 6) {
        clazzRoom = splitdSpace[4]
        teacher = splitdSpace[5].split(';')[0]
      } else if (splitdSpace.length == 5) {
        teacher = splitdSpace[4].split(';')[0]
        if (!teacher) {
          teacher = splitdSpace[3].split(';')[0]
        }
      } else if (splitdSpace.length == 4) {
        teacher = splitdSpace[3].split(';')[0]
      }

      if (clazzRoom.indexOf('(') !== -1) {
        const splitClazzRoom = clazzRoom.split('(')
        clazzRoom = splitClazzRoom[splitClazzRoom.length - 2]
      }

      // 这门课在一周中的哪一天
      const dayIndex = dayZhToIndex(/\d/.test(splitdSpace[0]) ? splitdSpace[1] : splitdSpace[0])

      // 获取这门课在哪几周有
      const weekIndexes = []
      const weekText = /\d/.test(splitdSpace[0]) ? splitdSpace[0] : splitdSpace[1]
      weekText.split(',').map((splitdComma) => {
        if (splitdComma.split('~').length === 1) {
          // 对应情境：1~14周,15周
          weekIndexes.push(parseInt(splitdComma.split('~')[0].split('周')[0]))
        } else {
          let startWeek = splitdComma.split('~')[0]
          let endWeekString = splitdComma.split('~')[1].split('周')[0]
          // 判断有没有分单双周
          if (endWeekString.indexOf('单') !== -1) {
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              if (weekIndex % 2 !== 0) {
                weekIndexes.push(weekIndex)
              }
            }
          } else if (endWeekString.indexOf('双') !== -1) {
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              if (weekIndex % 2 === 0) {
                weekIndexes.push(weekIndex)
              }
            }
          } else {
            // 没有单双周
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              weekIndexes.push(weekIndex)
            }
          }
        }
      })

      // 获取这门课的上课时间
      const timeIndexes = []
      let startTime = timeZhToIndex(splitdSpace[2].split('~')[0])
      let endTime = timeZhToIndex(splitdSpace[2].split('~')[1])
      for (let timeIndex = parseInt(startTime); timeIndex <= parseInt(endTime); timeIndex++) {
        timeIndexes.push(timeIndex)
      }

      // 分配一个颜色
      let color = lessonIdsColor[lessonId]

      // 填充scheduleMatrix
      const courseBoxData = {
        type: 'course',
        name,
        credits,
        lessonId,
        clazzRoom,
        teacher,
        weekIndexes,
        dayIndex,
        timeIndexes,
        studentClazzes: studentClazzes.split(','),
        lessonCode,
        lessonType,
        studentNumber,
        timeRange: timeTable ? (timeTable[startTime - 1].startTimeText + '-' + timeTable[endTime - 1].endTimeText) : '',
        weekIndexesZh,
        campus,
        semesterId,
        semestercode,
        color,
        memo: '',
      }

      weekIndexes.map((weekIndex_) => {
        // const courseBoxList = scheduleMatrix[weekIndex_ - 1][dayIndex - 1][parseInt(parseInt(startTime / 2))]
        const courseBoxList = scheduleMatrix[weekIndex_ - 1][dayIndex - 1][startTime - 1]
        for (let cn = 0; cn < courseBoxList.length; cn++) {
          if (courseBoxList.length > cn) {
            const { lessonId: existCourseId } = courseBoxList[cn]
            if (existCourseId === lessonId) {
              // 同一堂课，两个老师
              courseBoxData.teacher = `${teacher}、${courseBoxList[cn].teacher}`
              courseBoxList[cn] = _.cloneDeep(courseBoxData)
              return null
            }
          }
        }
        // 确保同一时间的两门课的颜色不同
        if (courseBoxList.length > 0) {
          const existColor = courseBoxList[0].color
          while (color === existColor) {
            const randomI = Math.floor(Math.random() * lessonIds.length + 1) - 1
            color = lessonIdsColor[lessonIds[randomI]]
          }
          courseBoxData.color = color
        }

        courseBoxData.weekIndex = weekIndex_
        courseBoxList.push(_.cloneDeep(courseBoxData))
      })
    })

  })

  // 给所有没课的添加{}
  scheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList, timeIndex) => {
        if (courseBoxList.length === 0) {
          courseBoxList.push({ timeIndexes: [timeIndex + 1] })
        }
      })
    })
  })

  // console.log(scheduleMatrix)

  return {
    scheduleMatrix,
    moocData,
  }
}


const initLessonIdsColor = (lessonIds) => {
  // 十个颜色随机
  let theme = 0
  try {
    theme = Taro.getStorageSync('config').userConfig.theme
  } catch (error) { }

  const colors = themeColors[theme].map(themeColor => themeColor.value)
  const lessonIdsColor = {}
  lessonIds.map((lessonId) => {
    lessonIdsColor[lessonId] = colors[Math.floor((Math.random() * colors.length))]
  })
  return lessonIdsColor
}

// 将中文的周目转化为index
const dayZhToIndex = (dayZh) => {
  let dayIndex = 0
  switch (dayZh) {
    case '周一':
      dayIndex = 1
      break;
    case '周二':
      dayIndex = 2
      break;
    case '周三':
      dayIndex = 3
      break;
    case '周四':
      dayIndex = 4
      break;
    case '周五':
      dayIndex = 5
      break;
    case '周六':
      dayIndex = 6
      break;
    default:
      dayIndex = 7
      break;
  }
  return dayIndex
}

// 将中文的周目转化为index
export const dayIndexToZh = (dayIndex) => {
  let dayZh = 0
  switch (dayIndex) {
    case 0:
      dayZh = '周一'
      break;
    case 1:
      dayZh = '周二'
      break;
    case 2:
      dayZh = '周三'
      break;
    case 3:
      dayZh = '周四'
      break;
    case 4:
      dayZh = '周五'
      break;
    case 5:
      dayZh = '周六'
      break;
    default:
      dayZh = '周日'
      break;
  }
  return dayZh
}

// 将上课时间转化为index
const timeZhToIndex = (timeZh) => {
  let timeIndex = 1
  switch (timeZh) {
    case '第一节':
      timeIndex = 1
      break;
    case '第二节':
      timeIndex = 2
      break;
    case '第三节':
      timeIndex = 3
      break;
    case '第四节':
      timeIndex = 4
      break;
    case '第五节':
      timeIndex = 5
      break;
    case '第六节':
      timeIndex = 6
      break;
    case '第七节':
      timeIndex = 7
      break;
    case '第八节':
      timeIndex = 8
      break;
    case '第九节':
      timeIndex = 9
      break;
    case '第十节':
      timeIndex = 10
      break;
    case '第十一节':
      timeIndex = 11
      break;

    default:
      break;
  }
  return timeIndex
}
