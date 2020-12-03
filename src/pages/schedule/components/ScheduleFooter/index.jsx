import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import * as actions from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'


function ScheduleFooter(props) {
  const { weekIndex, currentWeekIndex, scheduleMatrix, diff, userType, changeWeekIndex } = props
  
  const handleDiff = () => {
    if (!diff) {
      props.diffSchedule({ targetScheduleM: scheduleMatrix })
    } else {
      props.cancelDiff()
    }
  }

  return (
    <View className='generalSchedule-footer'>
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex - 1)} >
        <IconFont name='arrow-lift' size={52} color='#60646b' />
      </View>
      {
        userType === 'her' &&
        <View className={`generalSchedule-footer-pop generalSchedule-footer-pop-${diff ? 'active' : ''}`} onClick={handleDiff} >
          <Text className='generalSchedule-footer-pop-text'>对比</Text>
        </View>
      }
      {
        weekIndex !== currentWeekIndex &&
        <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(currentWeekIndex)}>
          <Text className='generalSchedule-footer-pop-text'>本周</Text>
        </View>
      }
      <View className='generalSchedule-footer-pop' onClick={() => changeWeekIndex(weekIndex + 1)}>
        <IconFont name='arrow-right' size={52} color='#60646b' />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    userType: state.login.bizData.userType,
    weekIndex: state.schedule.bizData.weekIndex,
    currentWeekIndex: state.schedule.bizData.currentWeekIndex,
    scheduleMatrix: state.schedule.bizData.scheduleMatrix,
    diff: state.schedule.uiData.diff,
  };
}

export default connect(mapStateToProps, actions)(ScheduleFooter);