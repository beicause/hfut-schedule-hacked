import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'

import weatherConfig from '../../../../assets/img/weather/enter'
import './index.scss'

export default (props) => {
  const { statusBarHeight } = props
  const weatherRealTime = useSelector(state => state.event.bizData.weatherRealTime)
  if (!weatherRealTime.skycon) {
    return (
      <View className='weather' style={{ top: statusBarHeight + 8 }}>
        <Text className='weather-loading'>正在获取天气...</Text>
      </View>
    )
  }
  else if (weatherRealTime.skycon === 'failed') {
    return (
      <View className='weather' style={{ top: statusBarHeight + 8 }}>
        <Text className='weather-loading'></Text>
      </View>
    )
  }
  const imgSrc = weatherConfig[weatherRealTime.skycon].img

  return (
    <View className='weather' style={{ top: statusBarHeight + 8 }}>
      <Image className='weather-img' src={imgSrc} />
      <Text className='weather-temp'>{weatherRealTime.temperature}°C</Text>
    </View>
  )
}