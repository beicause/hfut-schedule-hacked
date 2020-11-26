import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Image, Text, Ad } from '@tarojs/components'

import img from '../../../../assets/img/teacherEvaluate.svg'
import themeC from '../../../../style/theme'
import './index.scss'

function TeacherEvaluate() {
  const showAd = useSelector(state => state.schedule.bizData.userConfig.showAd)
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  return (
    <View className='teacherEvaluate'>
      <View className='teacherEvaluate-none'>
        <Image
          src={img}
          className='teacherEvaluate-none-noneImg'
        />
        <Text className='teacherEvaluate-none-noneText'>聪明人才不会一个老师点十几次按钮</Text>
        <View className='teacherEvaluate-none-ad'>
          {/* {
            showAd &&
            <Ad unit-id='adunit-209201f9afd060be' ad-type='video' ad-theme='white'></Ad>
          } */}
        </View>
      </View>
    </View>
  )
}

export default TeacherEvaluate
