import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'

import updateHistory from '../../../../assets/data/updateHistory'
import IconFont from '../../../../components/iconfont'
import themeC from '../../../../style/theme'
import './index.scss'


function Gift() {
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  const handleClickAddQQ = () => {
    Taro.setClipboardData({
      data: '673885056',
      success: function () {
        Taro.hideToast();
        Taro.showModal({
          title: '小提示',
          showCancel: false,
          content: '群号已复制到剪切板',
          confirmColor: '#0089ff',
        })
      }
    })
  }

  return (
    <View className='feedbackUpdate'>

      <View className='feedbackUpdate-header'>
        <View className='feedbackUpdate-header_comment'>同学们现在可以通过新的方式进行反馈啦，支持上传图片。 另外也可以通过“联系客服”直接进行提问和反馈，我看到就会尽快回复的~</View>
      </View>

      <View className='feedbackUpdate-card'>
        <View className='feedbackUpdate-card-item'>
          <Button className='feedbackUpdate-card-item-btn' style={{ color: themeC[`color-brand-${globalTheme}`] }} openType='feedback'>功能建议/问题反馈</Button>
        </View>
        <View className='feedbackUpdate-card-item'>
          <Button className='feedbackUpdate-card-item-btn' style={{ color: themeC[`color-brand-${globalTheme}`] }} openType='contact'>联系客服</Button>
        </View>
        <View className='feedbackUpdate-card-item'>
          <Button className='feedbackUpdate-card-item-btn' style={{ color: themeC[`color-brand-${globalTheme}`] }} onClick={handleClickAddQQ}>加入反馈交流群</Button>
        </View>
      </View>

      <View className='feedbackUpdate-history'>
        <Text>以下是历史更新（只记录重大功能性更新）</Text>
      </View>

      <View className='feedbackUpdate-list'>
        {
          updateHistory.map((updateData, ui) => (
            <View key={updateData.version} className='feedbackUpdate-list-item'>
              <View className='feedbackUpdate-list-item-title'>
                {/* <View style={{ position: 'relative', top: 2 }}> */}
                  <IconFont name='huatifuhao' size={44} color={themeC[`color-brand-light-${globalTheme}`]} />
                <Text style={{ marginLeft: 8 }}>{updateData.version}</Text>
              </View>
              <View className='feedbackUpdate-list-item-comment'>
                <Text>更新时间：{updateData.time}</Text>
              </View>
              <View className='feedbackUpdate-list-item-content'>
                {
                  updateData.features.map((feature, fi) => (
                    <View key={fi} className='feedbackUpdate-list-item-content-item'>· {feature}</View>
                  ))
                }
              </View>

              {
                (ui + 1) !== updateHistory.length && <View className='feedbackUpdate-list-line'></View>
              }
            </View>
          ))
        }
      </View>

    </View>
  )
}

export default Gift
