import React, { useState } from 'react'
import { View, Picker } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import IconFont from '../../../../../../components/iconfont'
import WeekPicker from '../../../../../../components/schedule-component/WeekPicker'
import themeC from '../../../../../../style/theme'
import semesterData from '../../../../../../assets/data/semesterData'
import { UPDATE_BIZDATA } from '../../../../../../constants/schedule/historySchedule'


export default (props) => {
  const { changeWeekIndex } = props
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const weekIndex = useSelector(state => state.historySchedule.bizData.weekIndex)
  const semester = useSelector(state => state.historySchedule.bizData.semester)
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)
  const dispatch = useDispatch()

  const handleSemesterChange = e => {
    dispatch({
      type: UPDATE_BIZDATA,
      payload: { semester: semesterData[e.detail.value] },
    })
  }

  return (
    <View className='scheduleTop' style={{ backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }}>

      <View className='scheduleTop-aixin'>
        <IconFont name='info-circle-fill' size={42} color='#ffffff' />
      </View>

      <View className='scheduleTop-title' onClick={() => setShowWeekPicker(true)}>
        {`第${weekIndex + 1}周 `}
        <View className='scheduleTop-title-icon'>
          <IconFont name='icon-test' size={46} color='#ffffff' />
        </View>
      </View>

      <View className='scheduleTop-operation'>
        <Picker
          mode='selector'
          range={semesterData}
          value={semester.index}
          rangeKey='nameZh'
          onChange={handleSemesterChange}
        >
          <IconFont name='search' size={46} color='#ffffff' />
        </Picker>
      </View>

      <WeekPicker
        isOpened={showWeekPicker}
        onClose={() => setShowWeekPicker(false)}
        weekIndex={weekIndex}
        currentWeekIndex={null}
        onChange={changeWeekIndex}
      />

    </View>

  )
}
