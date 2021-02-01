import Taro from '@tarojs/taro'

import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/score'
import { GET } from '../utils/request'
import { relogin } from '../actions/login'


// 1.检测本地缓存，有数据优先渲染
// 2.发送异步请求，请求到了就渲染数据，并缓存
// 需缓存的数据：
// main = allRank + termRanks
// pubCredit, pubFailRate
export const enter = (type) => async (dispatch, getState) => {

  // 先将页面状态调整为加载中
  dispatch(updateUiData({ loading: true }))

  const localUserData = Taro.getStorageSync('me')
  const { userInfo: { username } } = localUserData

  // 确定请求地址
  let reqUrl = ''
  switch (type) {
    case 'main':  // 主页请求
      const { hasPub, rankType } = getState().schedule.bizData.userConfig
      reqUrl = `/score/${rankType === 'Gpa' ? 'byGpa' : 'byAvgScore'}/${username}/${hasPub}`
      break;
    case 'pubCredit':  // 个人公选数据请求
      reqUrl = `/score/publicClass/${username}`
      break;
    case 'pubFailRate':  // 公选挂科排名请求
      reqUrl = `/score/publicClass/rank`
      break;
    default:
      break;
  }

  // 检测本地缓存；优先渲染
  let localScoreData = Taro.getStorageSync('score')
  if (!localScoreData) {
    localScoreData = {}
  }
  switch (type) {
    case 'main':  // 主页数据
      if (localScoreData.allRank && localScoreData.termRanks) {
        dispatch(updateBizData({ allRank: localScoreData.allRank, termRanks: localScoreData.termRanks }))
      }
      break;
    case 'pubCredit':  // 个人公选数据数据
      if (localScoreData.pubCredit) {
        dispatch(updateBizData({ pubCredit: localScoreData.pubCredit }))
      }
      break;
    case 'pubFailRate':  // 公选挂科排名数据
      if (localScoreData.pubFailRate) {
        dispatch(updateBizData({ pubFailRate: localScoreData.pubFailRate }))
      }
      break;
    default:
      break;
  }

  // 异步请求，渲染+缓存
  GET(reqUrl).then(res => {
    if (res.success) {
      switch (type) {
        case 'main':  // 主页数据
          const { allRank, termRanks } = res.data
          dispatch(updateBizData({ allRank, termRanks }))
          Taro.setStorage({
            key: 'score',
            data: {
              ...localScoreData,
              allRank,
              termRanks,
            }
          })
          break;
        case 'pubCredit':  // 个人公选数据数据
          const pubCredit = res.data
          dispatch(updateBizData({ pubCredit }))
          Taro.setStorage({
            key: 'score',
            data: {
              ...localScoreData,
              pubCredit,
            }
          })
          break;
        case 'pubFailRate':  // 公选挂科排名数据
          const pubFailRate = res.data
          dispatch(updateBizData({ pubFailRate }))
          Taro.setStorage({
            key: 'score',
            data: {
              ...localScoreData,
              pubFailRate,
            }
          })
          break;
        default:
          break;
      }
    } else {
      // 请求失败了
      Taro.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
    }
    dispatch(updateUiData({ loading: false }))
    Taro.stopPullDownRefresh();
  })

}


export const enterScorelist = () => async (dispatch) => {

  // 先检测本地有没有，有的话就优先渲染
  const localScoreData = Taro.getStorageSync('score')
  const { scorelist } = localScoreData
  if (scorelist) {
    dispatch(updateBizData({ scorelist }))
    Taro.showNavigationBarLoading()
  } else {
    Taro.showLoading({ title: '加载中' })
  }

  // 请求重试次数
  let reloginTime = 0

  const getScorelist = () => {
    const userData = Taro.getStorageSync('me')
    const { userInfo } = userData
    const { key } = userInfo
    GET('/scorelist', { key })
      .then(res => {
        if (res.success) {
          // 请求成功
          reloginTime = 0
          dispatch(updateBizData({ scorelist: res.scorelist }))
          Taro.hideNavigationBarLoading()
          Taro.hideLoading()
          Taro.setStorage({
            key: 'score',
            data: {
              ...localScoreData,
              scorelist: res.scorelist
            }
          })
        } else {
          // key过期了
          reloginTime++
          if (reloginTime === 6) {
            setTimeout(() => {
              reloginTime = 0
            }, 100);
          }
          return dispatch(relogin({
            userType: 'me',
            reloginTime,
            callback: getScorelist,
          }))
        }
      })
      .catch(e => {
        reloginTime = 0
        console.error(e)
        Taro.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      })
  }

  getScorelist()



}

// 下面是常规
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

export const logout = () => {
  // 执行登出逻辑
  return {
    type: LOGOUT,
  }
}
