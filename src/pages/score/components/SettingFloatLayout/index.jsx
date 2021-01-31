import React from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import themeC from '../../../../style/theme'


function SettingFloatLayout(props) {
  const { isOpened, onClose, userConfig } = props
  const { hasPub, rankType, scoreDigits, globalTheme } = userConfig

  const rankTypeRange = [
    { name: '均分', value: 'Avg' },
    { name: '绩点', value: 'Gpa' },
  ]

  const scoreDigitsRange = [
    { name: '1位', value: 1 },
    { name: '2位', value: 2 },
    { name: '3位', value: 3 },
    { name: '4位', value: 4 },
  ]

  const updateUserConfig = (setting) => {
    props.updateBizData({
      userConfig: {
        ...userConfig,
        ...setting,
      }
    })
    const config = Taro.getStorageSync('config')
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

  const handleRankTypePickerChange = async (e) => {
    await updateUserConfig({ rankType: rankTypeRange[parseInt(e.detail.value)].value })
  }

  const handleHasPubChange = async (e) => {
    await updateUserConfig({ hasPub: e.detail.value })
  }

  const handleScoreDigitsChange = async (e) => {
    await updateUserConfig({ scoreDigits: scoreDigitsRange[parseInt(e.detail.value)].value })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={onClose}
    >
      <View className='settingFloatLayout-header'>
        排名设置
        <View className='settingFloatLayout-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='settingFloatLayout-content'>

        <Picker mode='selector'
          range={rankTypeRange}
          rangeKey='name'
          value={rankType === 'Gpa' ? 1 : 0}
          style={{ width: '100%' }}
          onChange={e => handleRankTypePickerChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>排名规则：{rankType === 'Gpa' ? '绩点' : '均分'}</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        <View className='settingFloatLayout-content-item'>
          <Text>包含公选</Text>
          <Switch checked={hasPub} onChange={e => handleHasPubChange(e)} color={themeC[`color-brand-${globalTheme}`]} />
        </View>

        <Picker mode='selector'
          range={scoreDigitsRange}
          rangeKey='name'
          value={scoreDigits - 1}
          style={{ width: '100%' }}
          onChange={e => handleScoreDigitsChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>保留小数：{scoreDigits}位</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        <View className='settingFloatLayout-footer'></View>

      </View>

    </AtFloatLayout >
  )
}
function mapStateToProps(state) {
  return {
    userConfig: state.schedule.bizData.userConfig,
  };
}

export default connect(mapStateToProps, scheduleActions)(SettingFloatLayout);
