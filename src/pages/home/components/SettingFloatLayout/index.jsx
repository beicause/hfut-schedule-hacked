import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Switch } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout } from 'taro-ui'

import * as scheduleActions_ from '../../../../actions/schedule'
import * as loginActions_ from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import CustomButton from '../../../../components/CustomButton'
import themeC from '../../../../style/theme'


function SettingFloatLayout(props) {
  const { userConfig, autoConfig, scheduleActions, loginActions, isOpened, onClose, openGlobalTheme, closeGlobalTheme } = props
  const { showDonate, globalTheme, showFuckedGrade } = userConfig
  const { fineModel } = autoConfig

  const handleLogoutClick = () => {
    Taro.showModal({
      title: '确定要登出吗',
      confirmText: '登出',
      confirmColor: '#f33f3f',
      cancelColor: '#60646b',
      success: function (res) {
        if (res.confirm) {
          // 点击确定
          Taro.showModal({
            title: '是否要清空本地数据',
            content: '包括自定义事件/备忘录、个人设置、情侣信息等',
            confirmText: '不清空',
            confirmColor: '#60646b',
            cancelText: '清空',
            cancelColor: '#f33f3f',
            success: function (res2) {
              if (res2.confirm) {
                loginActions.logout({ localSave: true })
              } else {
                loginActions.logout({ localSave: false })
              }
            }
          })
        }
      }
    })
  }


  const updateUserConfig = (setting) => {
    scheduleActions.updateBizData({
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

  const handleSettingClose = () => {
    closeGlobalTheme()
    onClose()
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={handleSettingClose}
    >
      <View className='settingFloatLayout-header'>
        设置
        <View className='settingFloatLayout-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='settingFloatLayout-content'>

        <View className='settingFloatLayout-content-item' onClick={openGlobalTheme}>
          <Text>设置小程序主题色</Text>
          <IconFont name='arrow-right' size={54} color='#60646b' />
        </View>

        <View className='settingFloatLayout-content-item'>
          <Text>隐藏捐赠入口</Text>
          <Switch checked={!showDonate} onChange={e => updateUserConfig({ showDonate: !e.detail.value })} color={themeC[`color-brand-${globalTheme}`]} />
        </View>

        <View className='settingFloatLayout-line'></View>

        {/* 开发者选项 */}
        {
          fineModel &&
          <>
            <View className='settingFloatLayout-content-item'>
              <Text>隐藏挂科的科目</Text>
              <Switch checked={!showFuckedGrade} onChange={e => updateUserConfig({ showFuckedGrade: !e.detail.value })} color={themeC[`color-brand-${globalTheme}`]} />
            </View>

            <View className='settingFloatLayout-line'></View>
          </>
        }

      </View>

      <View className='settingFloatLayout-footer'>
        <View className='settingFloatLayout-footer-btnBox'>
          <CustomButton value='退出登录' type='danger' onSubmit={handleLogoutClick} />
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

function mapDispatchToProps(dispatch) {
  return {
    scheduleActions: bindActionCreators(scheduleActions_, dispatch),
    loginActions: bindActionCreators(loginActions_, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingFloatLayout);
