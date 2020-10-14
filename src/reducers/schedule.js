import { UPDATE_BIZDATA, UPDATE_UIDATA, LOGOUT } from '../constants/schedule'

const INITIAL_STATE = {
  bizData: {
    weekIndex: 0, // 课表上展示的周数
    currentWeekIndex: 1, // 现实中的周数
    scheduleMatrix: [],
    dayLineMatrix: [],
    timeTable: [],
    meUpdate: false,
    herUpdate: false,
    userConfig: {
      theme: 0,
      showAiXin: true,
      imgOpacity: 0.9,
      courseOpacity: 0.88,
      eventBoxHeight: 1.5,
      showBoxMask: true,
      showEventMemo: true,
    },
    backgroundPath: '',
    moocData: [],
  },
  uiData: {
    diff: false,
    chosenBlank: [],
    showUpdateNotice: false,
    showHelpNotice: false,
    customScheduleFLData: {
      isOpened: false,
      name: '',
      clazzRoom: '',
      chosenWeeks: [],
      currentWeekIndex: 0,
      courseType: 1,
      dayIndex: 0,
      startTime: 0,
      lessonId: '',
      memo: '',
      color: 'blue',
    },
    colorPickerData: {
      isOpened: false,
      handleColorChange: null,
      theme: 0,
      currentColor: 'blue',
    },
    courseDetailFLData: {
      isOpened: false,
      type: 'course',
      name: '',
      clazzRoom: '',
      teacher: '',
      timeRange: '',
      timeIndexes: [],
      dayIndex: 0,
      lessonCode: '',
      lessonType: '',
      weekIndexes: [],
      studentClazzes: [],
      studentNumber: '',
      color: '',
      lessonId: '',
      campus: '',
      weekIndexesZh: '',
      credits: '',
      memo: '',
    }
  }
}

export default function counter(state = INITIAL_STATE, action) {
  const { payload } = action

  switch (action.type) {
    // 更新业务数据
    case UPDATE_BIZDATA:
      return {
        ...state,
        bizData: {
          ...state.bizData,
          ...payload,
        }
      }

    // 更新UI数据
    case UPDATE_UIDATA:
      return {
        ...state,
        uiData: {
          ...state.uiData,
          ...payload,
        }
      }

    // 登出
    case LOGOUT:
      return INITIAL_STATE

    // 

    default:
      return state
  }
}
