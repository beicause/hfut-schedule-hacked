import React from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import CustomButton from '../../../../components/CustomButton'
import themeC from '../../../../style/theme'
import { POST } from '../../../../utils/request'
import myEncrypt from '../../utils/encrypt'


function SettingFloatLayout(props) {
  const { isOpened, onClose, userConfig, autoConfig } = props
  const { hasPub, rankType, scoreDigits, showFuckedGrade, globalTheme } = userConfig
  const { fineModel } = autoConfig

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

  // 用户手动刷新数据
  const handleRefresh = () => {
    const scoreRefreshTime = Taro.getStorageSync('scoreRefreshTime')
    if (!scoreRefreshTime || (Date.now() - scoreRefreshTime > 300000)) {
      Taro.setStorage({
        key: 'scoreRefreshTime',
        data: Date.now()
      })
      Taro.showLoading({
        title: '加载中',
        mask: true,
      })
      const localUserData = Taro.getStorageSync('me')
      const { userInfo: { username } } = localUserData
      POST(`/score/reCraw/${myEncrypt(username)}`)
        .then(res => {
          Taro.hideLoading()
          if (res.success) {
            Taro.showToast({
              title: '完成',
              icon: 'success',
              duration: 2000
            })
          } else {
            Taro.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })

    } else {
      Taro.showToast({
        title: `请${300 - parseInt((Date.now() - scoreRefreshTime) / 1000)}秒后再操作`,
        icon: 'none',
        duration: 2000
      })
    }
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

        {/* 开发者选项 */}
        {
          fineModel &&
          <>
            <View className='settingFloatLayout-line'></View>
            <View className='settingFloatLayout-content-item'>
              <Text>隐藏挂科的科目</Text>
              <Switch checked={!showFuckedGrade} onChange={e => updateUserConfig({ showFuckedGrade: !e.detail.value })} color={themeC[`color-brand-${globalTheme}`]} />
            </View>
          </>
        }

      </View>

      <View className='settingFloatLayout-footer'>
        <View className='settingFloatLayout-footer-btnBox'>
          <CustomButton value='刷新数据' type='default' onSubmit={handleRefresh} />
        </View>
      </View>

    </AtFloatLayout >
  )
}
function mapStateToProps(state) {
  return {
    userConfig: state.schedule.bizData.userConfig,
    autoConfig: state.schedule.bizData.autoConfig,
  };
}

export default connect(mapStateToProps, scheduleActions)(SettingFloatLayout);
