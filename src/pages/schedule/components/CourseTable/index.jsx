import React from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.scss'

export default ({ weekScheduleData }) => {
  const diff = useSelector(state => state.schedule.uiData.diff)
  const chosenBlank = useSelector(state => state.schedule.uiData.chosenBlank)
  const weekIndex = useSelector(state => state.schedule.bizData.weekIndex)
  const currentWeekIndex = useSelector(state => state.schedule.bizData.currentWeekIndex)

  // 设置
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const showRedPoint = useSelector(state => state.schedule.bizData.userConfig.showRedPoint)
  const courseOpacity = useSelector(state => state.schedule.bizData.userConfig.courseOpacity)

  if (!weekScheduleData) {
    return ''
  }

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, dayIndex) => {
          const boxTypeList = []
          dayScheduleData.map((courseBoxList) => {
            const { timeIndexes = [] } = courseBoxList[0]
            const boxType = timeIndexes[timeIndexes.length - 1] - timeIndexes[0] + 1
            boxTypeList.push(boxType ? boxType : 1)
          })

          boxTypeList.map((boxType, boxi) => {
            if (boxType === 2) {
              boxTypeList[boxi + 1] = 0
            } else if (boxType === 3) {
              boxTypeList[boxi + 1] = 0
              boxTypeList[boxi + 2] = 0
            } else if (boxType === 4) {
              boxTypeList[boxi + 1] = 0
              boxTypeList[boxi + 2] = 0
              boxTypeList[boxi + 3] = 0
            }
          })

          return (
            <View className='courseTable-column' key={dayIndex}>
              {
                dayScheduleData.map((courseBoxList, startTime) => (
                  <CourseBox
                    key={startTime}
                    boxType={boxTypeList[startTime]}
                    courseBoxList={courseBoxList}
                    dayIndex={dayIndex}
                    startTime={startTime}
                    bizData={{
                      theme,
                      showRedPoint,
                      diff,
                      chosenBlank,
                      courseOpacity,
                      weekIndex,
                      currentWeekIndex,
                    }}
                  />
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}
