import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import IconFont from '../../../../../../../../components/iconfont'
import WeekPicker from '../../../../../../../../components/schedule-component/WeekPicker'
import themeC from '../../../../../../../../style/theme'


export default (props) => {
  const { changeWeekIndex } = props
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const weekIndex = useSelector(state => state.singleCourseSchedule.bizData.weekIndex)
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  return (
    <View className='scheduleTop' style={{ backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }}>

      <View className='scheduleTop-aixin'>
        {/* {roomZh} */}
      </View>

      <View className='scheduleTop-title' onClick={() => setShowWeekPicker(true)}>
        {`第${weekIndex + 1}周 `}
        <View className='scheduleTop-title-icon'>
          <IconFont name='icon-test' size={46} color='#ffffff' />
        </View>
      </View>

      <View className='scheduleTop-operation'>
        {/* <IconFont name='search' size={46} color='#ffffff' /> */}
      </View>

      <WeekPicker
        isOpened={showWeekPicker}
        onClose={() => setShowWeekPicker(false)}
        weekIndex={weekIndex}
        onChange={changeWeekIndex}
      />

    </View>

  )
}
