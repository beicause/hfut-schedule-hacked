import React from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import themeC from '../../../style/theme'
import { currentSemester } from '../../../config/config.default'
import './index.scss'

export default (props) => {
  const { isOpened, onClose, onChange, weekIndex: weekIndex_, currentWeekIndex } = props
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  const weekIndexes = []
  for (let i = 0; i < currentSemester.weekNumber; i++) {
    weekIndexes.push(i)
  }

  const handleClickWeekBox = (newWeekIndex) => {
    onChange(newWeekIndex)
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='weekPicker'
      onClose={onClose}
    >

      <View className='weekPicker-content'>
        <View className='weekPicker-content-weekIndexContent'>
          {
            weekIndexes.map((weekIndex) => {
              const isChosen  = weekIndex === weekIndex_
              return (
                <View key={`key${weekIndex}`}
                  className={`weekPicker-content-weekIndexContent-week weekPicker-content-weekIndexContent-week_${isChosen ? 'chosen' : ''}`}
                  style={{ 
                    opacity: weekIndex >= 20 ? 0 : 1, 
                    animationName: isChosen ? `grey-color-${globalTheme}` : `color-grey-${globalTheme}`,
                    backgroundColor: isChosen && themeC[`color-brand-${globalTheme}`]
                    }}
                  onClick={() => handleClickWeekBox(weekIndex)}
                >
                  {currentWeekIndex === weekIndex ? '本周' : weekIndex + 1}
                </View>
              )

            })
          }
        </View>
      </View>


    </AtFloatLayout >
  )
}
