import React from 'react'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Button } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import themeC, { globalThemeDatas } from '../../../../style/theme'
import { updateBizData } from '../../../../actions/schedule'
import './index.scss'

export default (props) => {
  const { isOpened, onClose } = props
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)
  const dispatch = useDispatch()

  const handleClick = (themeIndex) => {
    updateUserConfig({ globalTheme: themeIndex })
  }

  const updateUserConfig = (setting) => {
    const config = Taro.getStorageSync('config')
    dispatch(updateBizData({
      userConfig: {
        ...config.userConfig,
        ...setting,
      }
    }))

    return Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        userConfig: {
          ...config.userConfig,
          ...setting,
        }
      }
    })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='globalThemePicker'
      onClose={onClose}
    >

      <View className='globalThemePicker-content'>
        {
          globalThemeDatas.map(globalThemeData => (
            <View className='globalThemePicker-content-box' key={globalThemeData.index}>
              <Button
                className={`relative-circle-button globalThemePicker-content-box-${globalThemeData.index === globalTheme ? 'current' : 'btn'}`}
                style={{ backgroundColor: themeC[`color-brand-${globalThemeData.index}`], color: '#ffffff' }}
                onClick={() => handleClick(globalThemeData.index)}
              >
                {globalThemeData.name}
              </Button>
            </View>
          ))
        }
      </View>


    </AtFloatLayout >
  )
}
