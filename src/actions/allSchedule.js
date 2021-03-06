import Taro from '@tarojs/taro'
import _ from 'lodash'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule/allSchedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'
import scheduleDiffTool from '../utils/scheduleDiffTool'

export const updateScheduleData = (payload) => async (dispatch) => {
  const { clazz, level, semesterId } = payload

  Taro.showLoading({
    title: '正在查询...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))

  const res = await GET('/custom/schedule/schedule', { clazz, semesterId })
  const { scheduleData, lessonIds, timeTable: { courseUnitList: timeTable } } = res
  // 如果lessonIds为空，说明没有数据
  if (lessonIds.length === 0) {
    Taro.hideLoading()
    Taro.showToast({
      title: '检索结果为空',
      icon: 'none',
      duration: 1000
    })
    dispatch(updateBizData({ scheduleMatrix: [] }))
    return false
  }
  const { scheduleMatrix } = dataToMatrix(scheduleData, lessonIds, timeTable)
  scheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          // 过滤掉重修的课（非本年级的）、公选课
          const { studentClazzes, lessonType } = courseBoxData
          if (!studentClazzes || !lessonType) {
            return null
          }
          if (studentClazzes[0].indexOf(level) === -1 || lessonType.indexOf('公选') !== -1) {
            courseBoxList[timeIndex] = {}
          }
        })
      })
    })
  })
  await dispatch(updateBizData({ scheduleMatrix, backupScheduleM: _.cloneDeep(scheduleMatrix) }))
  Taro.hideLoading()
  return true
}

// 首次进入，检查本地存储有没有selectInfo和scheduleData。
// 有的话就dispaatch，没有就请求selectInfo并存在本地
export const enter = () => async (dispatch) => {
  // 先判断是不是第一次进入，是的话就显示help
  const config = Taro.getStorageSync('config')
  if (config.autoConfig.showAllSHelp) {
    Taro.showModal({
      title: '提示',
      content: `点击右上角的搜索按钮开始`,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#0089ff',
    })
    Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        autoConfig: {
          ...config.autoConfig,
          showAllSHelp: false,
        }
      }
    })
  }
  const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()
  dispatch(updateBizData({ dayLineMatrix: dayLineMatrix, currentWeekIndex, weekIndex: currentWeekIndex }))
  const localSelectInfo = Taro.getStorageSync('selectInfo')
  // 本地有selectinfo并且不是internal error
  if (localSelectInfo && typeof (localSelectInfo) !== 'string') {
    return dispatch(updateBizData({ selectInfo: localSelectInfo }))
  }
  // 请求一个selectinfo
  const selectInfoRes = await GET('/custom/schedule/select_info', {})
  if (typeof(selectInfoRes) === 'string') {
    return Taro.showToast({
      title: '全校课表出错，请重新进入或联系客服',
      icon: 'none',
      duration: 2000
    })
  }
  Taro.setStorage({
    key: 'selectInfo',
    data: selectInfoRes
  })
  dispatch(updateBizData({ selectInfo: selectInfoRes }))
}

// 开始执行diff
export const diffSchedule = ({ targetScheduleM }) => async (dispatch) => {
  // 先判断是不是第一次点击，是的话就显示help
  const config = Taro.getStorageSync('config')
  if (config.showDiffHelp) {
    Taro.showModal({
      title: '提示',
      content: `这是将另一张课表与自己的进行对比：绿色代表两方都没课；红色代表两方都有课；黄色代表只有自己有课；蓝色代表只有对方有课。`,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#0089ff',
    })
    Taro.setStorage({
      key: 'config',
      data: {
        ...config,
        showDiffHelp: false,
      }
    })
  }

  Taro.showLoading({
    title: '正在对比...',
    mask: true,
  })
  await dispatch(updateUiData({ diff: true }))
  const { scheduleMatrix: mineScheduleM } = Taro.getStorageSync('me')
  const diffScheduleM = scheduleDiffTool(targetScheduleM, mineScheduleM)
  await dispatch(updateBizData({ scheduleMatrix: diffScheduleM }))
  Taro.hideLoading()
}

export const cancelDiff = ({ backupScheduleM }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在关闭...',
    mask: true,
  })
  await dispatch(updateUiData({ diff: false }))
  await dispatch(updateBizData({ scheduleMatrix: _.cloneDeep(backupScheduleM) }))
  Taro.hideLoading()
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

export const logout = () => {
  // 执行登出逻辑
  return {
    type: LOGOUT,
  }
}
