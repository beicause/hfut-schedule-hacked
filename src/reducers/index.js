import { combineReducers } from 'redux'

import login from './login'
import event from './event'
import score from './score'

import schedule from './schedule/schedule'
import allSchedule from './schedule/allSchedule'
import roomDetailSchedule from './schedule/roomDetailSchedule'
import singleCourseSchedule from './schedule/singleCourseSchedule'
import historySchedule from './schedule/historySchedule'
import classlist from './schedule/classlist'

import card from './package-card/card'


export default combineReducers({
  login,
  event,
  score,

  schedule,
  allSchedule,
  roomDetailSchedule,
  singleCourseSchedule,
  historySchedule,
  classlist,

  card,
})
