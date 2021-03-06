import React, { memo } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import * as actions from '../../../../actions/allSchedule'
import WhiteTable from '../../../../components/schedule-component/WhiteTable'
import DayLine from '../../../../components/schedule-component/DayLine'
import TimeLine from '../../../../components/schedule-component/TimeLine'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import CourseDetailFloatLayout2 from '../../../../components/schedule-component/CourseDetailFloatLayout2'
import BackgroundImg from '../../../../components/schedule-component/BackgroundImg'
import ScheduleFooter from './components/ScheduleFooter'
import themeC from '../../../../style/theme'
import { currentSemester } from '../../../../config/config.default'

const MemoBackgroundImg = memo(BackgroundImg)


function AllSchedule(props) {
  const { bizData, uiData, globalTheme } = props
  const { weekIndex, currentWeekIndex, scheduleMatrix, dayLineMatrix } = bizData
  const { courseDetailFLData } = uiData

  useDidShow(() => {
    Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] })
    props.enter()
  })

  const changeWeekIndex = (weekIndex_) => {
    if (weekIndex_ < 0) {
      Taro.showToast({
        title: '当前已经是第一周',
        icon: 'none',
        duration: 500
      })
      return null
    } else if (weekIndex_ > (currentSemester.weekNumber - 1)) {
      Taro.showToast({
        title: '当前已经是最后一周',
        icon: 'none',
        duration: 500
      })
      return null
    }
    props.updateBizData({ weekIndex: weekIndex_ })
  }

  return (
    <View className='generalSchedule'>
      <View className='generalSchedule-header'>

        <ScheduleTop
          weekIndex={weekIndex}
          currentWeekIndex={currentWeekIndex}
          changeWeekIndex={changeWeekIndex}
        />
        <DayLine dayLineData={dayLineMatrix[weekIndex]} />
      </View>

      <View className='generalSchedule-content'>
        <TimeLine />
        <View className='generalSchedule-content-table'>
          <WhiteTable />
          {
            scheduleMatrix.length === 0 ? null :
              <CourseTable weekScheduleData={scheduleMatrix[weekIndex]} />
          }
        </View>
      </View>

      <ScheduleFooter changeWeekIndex={changeWeekIndex} />

      <CourseDetailFloatLayout2
        courseDetailFLData={courseDetailFLData}
        onClose={() => props.updateUiData({ courseDetailFLData: { isOpened: false } })}
      />

      <MemoBackgroundImg />

    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.allSchedule,
    showAd: state.schedule.bizData.userConfig.showAd,
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
  };
}

export default connect(mapStateToProps, actions)(AllSchedule);