import React, { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import EmptyImg from '../../../../assets/img/empty.svg'
import themeC from '../../../../style/theme'
import './index.scss'

function Mooc(props) {
  const { moocData, globalTheme } = props
  const [showLessonCode, setShowLessonCode] = useState('')

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  const copy = (data) => {
    Taro.setClipboardData({
      data,
      success: function () {
        Taro.hideToast();
        Taro.showModal({
          title: '小提示',
          showCancel: false,
          content: '网址已复制',
          confirmColor: '#0089ff',
        })
      }
    })
  }

  if (moocData.length === 0) {
    return (
      <View className='mooc'>
        <View className='mooc-none'>
          <Image
            src={EmptyImg}
            className='mooc-none-noneImg'
          />
          <Text className='mooc-none-noneText'>没有查询到慕课~</Text>
          <View className='mooc-none-ad'>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='mooc'>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC[`color-brand-${globalTheme}`]} />
        <Text className='mooc-subTitle_text'>慕课通知</Text>
      </View>

      <View className='mooc-notice'>
        <View className='mooc-notice-item'>
          <Text className='mooc-notice-title'>开放时间：</Text>
          <Text className='mooc-notice-comment'>10月15日8:00——11月11日18:00</Text>
        </View>
        <View className='mooc-notice-item'>
          <Text className='mooc-notice-title'>考核时间：</Text>
          <Text className='mooc-notice-comment'>11月13日8:00——11月20日18:00</Text>
        </View>
      </View>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC[`color-brand-${globalTheme}`]} />
        <Text className='mooc-subTitle_text'>平台网址</Text>
      </View>

      <View className='mooc-notice'>
        <View className='mooc-notice-item' onClick={() => copy('hfgydx.fy.chaoxing.com')}>
          <Text className='mooc-notice-title'>超星尔雅：</Text>
          <Text style={{ color: themeC[`color-brand-${globalTheme}`] }}>hfgydx.fy.chaoxing.com</Text>
        </View>
        <View className='mooc-notice-item' onClick={() => copy('hfut.amoocs.com.cn')}>
          <Text className='mooc-notice-title'>中博财商慕课：</Text>
          <Text style={{ color: themeC[`color-brand-${globalTheme}`] }}>hfut.amoocs.com.cn</Text>
        </View>
      </View>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC[`color-brand-${globalTheme}`]} />
        <Text className='mooc-subTitle_text'>我的慕课</Text>
      </View>

      {
        moocData.map(data => {
          const { name, lessonCode, credits, info, lessonType, openDepartment } = data
          return (
            <View key={lessonCode} className='mooc-item'>
              <AtAccordion
                open={showLessonCode === lessonCode}
                onClick={() => setShowLessonCode(showLessonCode === lessonCode ? '' : lessonCode)}
                title={name}
                style={{ color: '#000000' }}
                note={'平台：' + info.split('开课平台')[1].split('）')[0]}
                hasBorder={false}
              >
                <View className='mooc-item-content'>
                  <View className='mooc-item-content-line'></View>
                  <View className='mooc-item-content-list'>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>学分</Text>
                      <Text className='mooc-item-content-list-item_info'>{credits}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>开设学院</Text>
                      <Text className='mooc-item-content-list-item_info'>{openDepartment}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>课程类型</Text>
                      <Text className='mooc-item-content-list-item_info'>{lessonType}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>课程代码</Text>
                      <Text className='mooc-item-content-list-item_info'>{lessonCode}</Text>
                    </View>

                  </View>
                </View>
              </AtAccordion>
            </View>
          )
        })
      }
    </View>
  )
}

function mapStateToProps(state) {
  return {
    moocData: state.schedule.bizData.moocData,
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
  };
}

export default connect(mapStateToProps)(Mooc);