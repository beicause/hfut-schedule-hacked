import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/login'
import { GET, POST } from '../utils/request'
import { enter, logout as scheduleLogout } from './schedule'
import { logout as allScheduleLogout } from './allSchedule'
import { logout as eventLogout } from './event'
import { logout as scoreLogout, updateUiData as updateScoreUiData } from './score'
import { config } from '../config/config.default'

export const login = ({ username, password, userType, campus }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在加载...',
    mask: true,
  })
  const res = await GET('/login', { username, password })
  Taro.hideLoading()

  // 这种情况一般是突然封网了
  if (!res) {
    return Taro.atMessage({
      'message': '教务又双叒叕出问题了，请稍后再试',
      'type': 'error',
      duration: 2000,
    })
  }

  const { success, msg, key } = res
  // 验证失败
  if (!success) {
    if (msg.indexOf('webvpn登录出错') !== -1) {
      Taro.atMessage({
        'message': '教务又双叒叕出问题了，请稍后再试',
        'type': 'error',
        duration: 2000,
      })
    } else {
      Taro.atMessage({
        'message': msg,
        'type': 'error',
        duration: 2000,
      })
    }

    return null
  }

  // 验证成功
  await Taro.setStorage({
    key: userType,
    data: {
      userInfo: {
        username,
        password,
        campus,
        key,
      },
      scheduleMatrix: [],
      timeTable: [],
      scheduleData: [],
      lessonIds: [],
    }
  })

  // 写入版本信息、自动设置、用户设置
  // 假如本地有config，则跳过本环节
  const localConfig = Taro.getStorageSync('config')
  if (userType === 'me' && !localConfig) {
    Taro.setStorage({
      key: 'config',
      data: config,
    })
  }

  // 请求爬取成绩数据
  dispatch(updateScoreUiData({ crawing: true }))
  POST(`/score/reCraw/${username}`)
  .then(() => {
    console.log('爬虫完成')
    dispatch(updateScoreUiData({ crawing: false }))
  })

  // 跳转至课表页
  await Taro.switchTab({ url: '/pages/schedule/index' })

  return null
}


// 在情侣课表绑定页面 点击了返回
export const back = () => async (dispatch) => {
  dispatch(updateBizData({ userType: 'me' }))
  Taro.switchTab({ url: '/pages/schedule/index' })
}

export const unBindHer = () => async (dispatch) => {
  dispatch(updateBizData({ userType: 'me' }))
  await Taro.removeStorage({ key: 'her' })
  const customSchedule = Taro.getStorageSync('custom')
  delete customSchedule.her
  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })
  dispatch(enter({ userType: 'me' }))
}

export const updateBizData = (payload) => {
  return {
    type: UPDATE_BIZDATA,
    payload,
  }
}

export const updateUiData = (payload) => {
  return {
    type: UPDATE_UIDATA,
    payload,
  }
}


export const logout = ({ localSave = true }) => async (dispatch) => {
  // 执行登出逻辑
  dispatch(scheduleLogout())
  dispatch(allScheduleLogout())
  dispatch(eventLogout())
  dispatch(scoreLogout())

  if (localSave) {
    const localConfig = Taro.getStorageSync('config')
    const localCustom = Taro.getStorageSync('custom')
    const localHer = Taro.getStorageSync('her')
    await Taro.clearStorage()
    Taro.setStorage({
      key: 'config',
      data: localConfig
    })
    Taro.setStorage({
      key: 'custom',
      data: localCustom
    })
    if (localHer) {
      Taro.setStorage({
        key: 'her',
        data: localHer
      })
    }
  } else {
    await Taro.clearStorage()
  }

  await dispatch({ type: LOGOUT })
  Taro.redirectTo({ url: '/pages/login/index' })
}


// key失效，自动登录更新key
// userType: me or her
// reloginTime: 尝试次数，上限设定为5次，第6次就会提示“更新出错”
// callback: 重新登陆成功之后的回调函数
export const relogin = ({ userType, reloginTime, callback }) => async (dispatch) => {

  const localUserData = Taro.getStorageSync(userType)
  const { userInfo } = localUserData
  const { username, password, campus } = userInfo
  const res = await GET('/login', { username, password })

  const { success, key, msg } = res
  if (success && reloginTime < 6) {
    await Taro.setStorage({
      key: userType,
      data: {
        ...localUserData,
        userInfo: {
          username,
          password,
          key,
          campus,
        },
      }
    })
    // 
    return callback()
  } else {
    if (msg.indexOf('密码错误') !== -1) {
      Taro.showToast({
        title: '检测到教务密码变动，请重新登录',
        icon: 'none',
        duration: 2000
      })
      if (userType === 'me') {
        setTimeout(() => {
          dispatch(logout({ localSave: true }))
        }, 1750);
      }
    }
    else if (msg.indexOf('注册') !== -1) {
      Taro.showToast({
        title: '请先前往信息门户修改教务密码~',
        icon: 'none',
        duration: 2000
      })
      if (userType === 'me') {
        setTimeout(() => {
          dispatch(logout({ localSave: true }))
        }, 1750);
      }
    }
    else {
      Taro.showToast({
        title: '更新出错，下拉刷新试试或退出重进试试~',
        icon: 'none',
        duration: 2000
      })
    }
    console.error('重新登陆出错')
    Taro.hideNavigationBarLoading()
  }
}
