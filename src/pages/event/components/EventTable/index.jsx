import React from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import EventBox from '../EventBox'
import './index.scss';

export default () => {
  const scheduleMatrix = useSelector(state => state.event.bizData.scheduleMatrix)
  const timeTable = useSelector(state => state.event.bizData.timeTable)
  const weekIndex = useSelector(state => state.event.bizData.weekIndex)
  const dayIndex = useSelector(state => state.event.bizData.dayIndex)
  const chosenBlank = useSelector(state => state.event.uiData.chosenBlank)
  const timeDistance = useSelector(state => state.event.uiData.timeDistance)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)

  // 天气
  const weatherHourly = useSelector(state => state.event.bizData.weatherData.hourly)

  // 设置
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const showBoxMask = useSelector(state => state.schedule.bizData.userConfig.showBoxMask)
  const showEventMemo = useSelector(state => state.schedule.bizData.userConfig.showEventMemo)
  const eventBoxHeight = useSelector(state => state.schedule.bizData.userConfig.eventBoxHeight)

  if (scheduleMatrix.length === 0 || timeTable.length < 5) {
    return <View></View>
  }

  const dayScheduleData = scheduleMatrix[weekIndex][dayIndex]

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

  const { startTime: startTime_ } = timeTable[0]
  // let paddingTop = 97 + 48 + (startTime_ - 800) * 1.5
  let paddingTop = 62 * eventBoxHeight + 32 + (startTime_ - 800) * eventBoxHeight

  return (
    <View className='eventTable' style={{ top: paddingTop + 'rpx' }}>
      {
        dayScheduleData.map((courseBoxList, startTime) => (
          <EventBox
            boxType={boxTypeList[startTime]}
            courseBoxList={courseBoxList}
            key={startTime}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
            startTime={startTime}
            timeTable={timeTable}
            bizData={{
              chosenBlank,
              timeDistance,
              currentDayIndex,
              currentWeekIndex,
              dayLineMatrix,
              weatherHourly,
              theme,
              showBoxMask,
              showEventMemo,
              eventBoxHeight,
            }}
          />
        ))
      }
    </View>
  )
}

