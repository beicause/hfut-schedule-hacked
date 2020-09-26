import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Switch, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AtFloatLayout, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import * as scheduleActions_ from '../../../../actions/schedule'
import * as loginActions_ from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import CustomButton from '../../../../components/CustomButton'
import './index.scss'

function SettingFloatLayout(props) {
  const { userConfig, userType, scheduleActions, loginActions, isOpened, onClose } = props
  const { theme, showAiXin } = userConfig
  const [showSetBackground, setShowSetBackground] = useState(false)

  const themeRange = [
    { name: '默认', value: 0 },
    { name: '活泼', value: 1 },
    { name: '莫兰迪', value: 2 },
  ]

  const handleUnbindHerClick = () => {
    Taro.showModal({
      title: '确定要解绑吗',
      content: '此操作将清空ta的所有数据',
      success: function (res) {
        if (res.confirm) {
          loginActions.unBindHer()
        }
      }
    })
  }

  const handleLogoutClick = () => {
    Taro.showModal({
      title: '确定要登出吗',
      content: '此操作将清空所有本地数据',
      success: function (res) {
        if (res.confirm) {
          loginActions.logout()
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

  const handleThemePickerChange = async (e) => {
    await updateUserConfig({ theme: themeRange[parseInt(e.detail.value)].value })
    if (userType === 'me') {
      if (Taro.getStorageSync('her').scheduleMatrix) {
        scheduleActions.refreshColor({ userType: 'her', render: false })
      }
      await scheduleActions.refreshColor({ userType: 'me' })
    } else {
      scheduleActions.refreshColor({ userType: 'me', render: false })
      await scheduleActions.refreshColor({ userType: 'her' })
    }
    Taro.showToast({
      title: '更换成功',
      icon: 'success',
      duration: 1000
    })
  }

  const handleSettingImg = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: async function (chooseImgRes) {
        // 选择成功了一张图片，先清空本地的缓存图片
        await Taro.getSavedFileList({
          success: function (savedFileRes) {
            if (savedFileRes.fileList.length > 0) {
              Taro.removeSavedFile({
                filePath: savedFileRes.fileList[0].filePath,
                complete: function (removeRes) {
                  console.log(removeRes)
                }
              })
            }
          }
        })
        const tempFilePath = chooseImgRes.tempFilePaths[0]
        await Taro.saveFile({
          tempFilePath: tempFilePath,
          success: function (saveFileRes) {
            const savedFilePath = saveFileRes.savedFilePath
            scheduleActions.updateBizData({ backgroundPath: savedFilePath })
          }
        })
        Taro.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }

  const handleDeleteImg = () => {
    Taro.getSavedFileList({
      success: function (savedFileRes) {
        if (savedFileRes.fileList.length > 0) {
          Taro.removeSavedFile({
            filePath: savedFileRes.fileList[0].filePath,
            complete: function () {
              scheduleActions.updateBizData({ backgroundPath: '' })
              Taro.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        }
      }
    })
  }

  const handleSettingClose = () => {
    setShowSetBackground(false)
    onClose()
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={handleSettingClose}
    >
      <View className='settingFloatLayout-header'>课表设置</View>

      <View className='settingFloatLayout-content'>

        <Picker mode='selector'
          range={themeRange}
          rangeKey='name'
          value={theme}
          style={{ width: '100%' }}
          onChange={e => handleThemePickerChange(e)}
        >
          <View className='settingFloatLayout-content-item'>
            <Text>更换配色主题</Text>
            <IconFont name='arrow-right' size={54} color='#60646b' />
          </View>
        </Picker>

        <View className='settingFloatLayout-content-item' onClick={() => setShowSetBackground(true)}>
          <Text>设置背景图片</Text>
          <IconFont name='arrow-right' size={54} color='#60646b' />
        </View>

        {
          userType === 'me' &&
          <View className='settingFloatLayout-content-item'>
            <Text>隐藏情侣课表入口</Text>
            <Switch checked={!showAiXin} onChange={e => updateUserConfig({ showAiXin: !e.detail.value })} color='#29a2ff' />
          </View>
        }

        <View className='settingFloatLayout-line'></View>

        <View className='settingFloatLayout-footer'>
          <View className='settingFloatLayout-footer-btnBox'>
            <CustomButton value='解绑情侣' type='primary' onSubmit={handleUnbindHerClick} />
          </View>
          <View className='settingFloatLayout-footer_blank'></View>
          <View className='settingFloatLayout-footer-btnBox'>
            <CustomButton value='退出登录' type='danger' onSubmit={handleLogoutClick} />
          </View>
        </View>

      </View>

      <AtActionSheet isOpened={showSetBackground} onClose={() => setShowSetBackground(false)} cancelText='取消' title={`注：选择好图片后点击左下角的“预览-编辑”\n可以对图片进行裁剪哦！`}>
        <AtActionSheetItem onClick={handleSettingImg}>
          从相册选取图片
        </AtActionSheetItem>
        <AtActionSheetItem onClick={handleDeleteImg} className='settingFloatLayout-actionSheet-danger'>
          删除已选择的图片
        </AtActionSheetItem>
      </AtActionSheet>

    </AtFloatLayout >
  )
}

function mapStateToProps(state) {
  return {
    userConfig: state.schedule.bizData.userConfig,
    userType: state.login.bizData.userType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scheduleActions: bindActionCreators(scheduleActions_, dispatch),
    loginActions: bindActionCreators(loginActions_, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingFloatLayout);