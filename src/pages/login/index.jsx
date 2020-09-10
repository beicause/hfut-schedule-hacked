import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text, Input } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import IconFont from '../../components/iconfont'
import * as actions from '../../actions/login'
import CustomButton from '../../components/CustomButtom'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import './index.less'

function Login(props) {
  const { bizData, uiData } = props
  const { username, password } = bizData
  const { isLoginDisabled, showPwd, showLoginHelp } = uiData

  useDidShow(() => {
    Taro.hideHomeButton()
  })

  const submitHandleClick = () => {
    if (!username || !password) {
      Taro.atMessage({
        'message': `请填写${!username ? '学号' : '密码'}`,
        'type': 'warning',
        duration: 2000,
      })
      return null
    }
    props.login({ username, password })
  }

  return (
    <View className='login'>

      <View className='login-header'>
        <Text className='login-header-title'>登录</Text>
        <Text className='login-header-secondary'>请绑定教务系统账号</Text>
      </View>

      <View className='login-content'>
        <View className='login-content-item'>
          <Input
            className='login-content-item-input'
            type='number'
            border={false}
            placeholder='请输入学号'
            placeholder-style='color:#ccc;'
            value={username}
            onInput={(e) => props.updateBizData({ username: e.detail.value })}
          />
        </View>

        <View className='login-content-item'>
          <Input
            className='login-content-item-input'
            password={!showPwd}
            border={false}
            placeholder='请使用教务系统账号登录'
            placeholder-style='color:#ccc;'
            value={password}
            onInput={(e) => props.updateBizData({ password: e.detail.value })}
          />
          <View
            className='login-content-item-icon'
            onClick={() => props.updateUiData({ showPwd: !showPwd })}
          >
            {
              showPwd ?
                <IconFont name='eye-close' size={46} color='#60646b' />
                :
                <IconFont name='eye' size={46} color='#60646b' />
            }
          </View>

        </View>

        <CustomButton
          value='登录'
          type='call'
          disabled={isLoginDisabled}
          onSubmit={submitHandleClick}
        />

      </View>

      <View className='login-footer footer' onClick={() => props.updateUiData({ showLoginHelp: true })}>
        关于这个
      </View>
      <AtMessage />
      <StandardFloatLayout
        isOpened={showLoginHelp}
        onClose={() => props.updateUiData({ showLoginHelp: false })}
        title='合工大课程表无敌版'
        content='在学校封网时也可以看课表，造福工大学子。'
        buttons={[{
          value: '知道了',
          color: 'blue',
          onClick: () => props.updateUiData({ showLoginHelp: false })
        }]}
      />
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.login
  };
}

export default connect(mapStateToProps, actions)(Login);