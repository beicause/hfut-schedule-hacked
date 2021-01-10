import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'

import { config, updateInfo } from '../../config/config.default'
import IconFont from '../../components/iconfont'
import './index.scss'
import themeC from '../../style/theme'

export default ({ onClose }) => {
  const { version } = config
  const { notices, features, bugs } = updateInfo
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  return (
    <View className='updateNotice'>

      <View className='updateNotice-content'>
        <View className='updateNotice-content-title'>{`${version}更新公告`}</View>
        <View className='updateNotice-content-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>

        {
          notices.length !== 0 &&
          <>
            <View className='updateNotice-content-subTitle'>
              <IconFont name='tanhao' size={36} color={themeC[`color-brand-${globalTheme}`]} />
              <Text className='updateNotice-content-subTitle_text'>功能上线</Text>
            </View>
            {
              notices.map((notice, index) => (
                <View className='updateNotice-content-item' key={`thisis${index}`}>
                  <View className='updateNotice-content-item-info'>{notice.info}</View>
                  {
                    notice.comment &&
                    <View className='updateNotice-content-item-comment'>{notice.comment}</View>
                  }
                </View>
              ))
            }
            {/* <View className='updateNotice-content-line'></View> */}
          </>
        }

        {
          features.length !== 0 &&
          <>
            <View className='updateNotice-content-subTitle'>
              <IconFont name='ceshi' size={36} color={themeC[`color-brand-${globalTheme}`]} />
              <Text className='updateNotice-content-subTitle_text'>内容升级</Text>
            </View>
            {
              features.map((feature, index) => (
                <View className='updateNotice-content-item' key={`thisis${index}`}>
                  <View className='updateNotice-content-item-info'>{feature.info}</View>
                  {
                    feature.comment &&
                    <View className='updateNotice-content-item-comment'>{feature.comment}</View>
                  }
                </View>
              ))
            }
          </>
        }

        {
          bugs.length !== 0 &&
          <>
          {/* 只有bug更新的时候注释掉 */}
            {/* <View className='updateNotice-content-line'></View> */}

            <View className='updateNotice-content-subTitle'>
              <IconFont name='anquan' size={36} color={themeC[`color-brand-${globalTheme}`]} />
              <Text className='updateNotice-content-subTitle_text'>问题修复</Text>
            </View>
            {
              bugs.map((bug, index) => (
                <View className='updateNotice-content-item' key={`thisis${index}`}>
                  <View className='updateNotice-content-item-info'>{bug.info}</View>
                  {
                    bug.comment &&
                    <View className='updateNotice-content-item-comment'>{bug.comment}</View>
                  }
                </View>
              ))
            }
          </>
        }

      </View>

      <View className='updateNotice-mask' onClick={onClose}></View>
    </View>
  )
}
