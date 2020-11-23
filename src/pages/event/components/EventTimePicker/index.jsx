import React, { useState, useEffect } from 'react'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { AtCalendar } from "taro-ui"

import { updateBizData, updateUiData, updateDayByCalendar } from '../../../../actions/event'
import IconFont from '../../../../components/iconfont'
import './index.scss';

export default () => {
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  const weekIndex = useSelector(state => state.event.bizData.weekIndex)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const dayIndex = useSelector(state => state.event.bizData.dayIndex)
  const showCalendar = useSelector(state => state.event.uiData.showCalendar)
  const [currentSwiper, setCurrentSwiper] = useState(1)
  const [weekDataList, setWeekDataList] = useState([[
    { dayZh: "周一", dateZh: "2000/10/01", today: false },
    { dayZh: "周二", dateZh: "2000/10/02", today: false },
    { dayZh: "周三", dateZh: "2000/10/03", today: false },
    { dayZh: "周四", dateZh: "2000/10/04", today: false },
    { dayZh: "周五", dateZh: "2000/10/05", today: false },
    { dayZh: "周六", dateZh: "2000/10/06", today: false },
    { dayZh: "周日", dateZh: "2000/10/07", today: false },
  ]])
  const dispatch = useDispatch()

  useEffect(() => {
    if (weekDataList.length !== 1 || dayLineMatrix.length === 0) {
      return
    }
    
    const weekDataList_ = []
    if (weekIndex > 0) {
      weekDataList_.push(dayLineMatrix[weekIndex - 1])
    }
    weekDataList_.push(dayLineMatrix[weekIndex])
    if (weekIndex < dayLineMatrix.length - 1) {
      weekDataList_.push(dayLineMatrix[weekIndex + 1])
    }
    setWeekDataList(weekDataList_)
  }, [dayLineMatrix, weekDataList, weekIndex])


  const handleClickDay = (dayIndex_, weekIndex_) => {
    dispatch(updateBizData({
      dayIndex: dayIndex_,
      weekIndex: weekIndex_,
    }))
  }

  const handleClickCalendarDay = ({ value: { end } }) => {
    dispatch(updateDayByCalendar({ date: end }))
  }

  return (
    <View className='eventTimePicker'>
      {
        showCalendar ?
          <View className='eventTimePicker-calendar'>
            <AtCalendar isSwiper={false} minDate='2020/9/7' maxDate='2021/1/24' onSelectDate={e => handleClickCalendarDay(e)} />
            <View className='eventTimePicker-calendar-back' onClick={() => dispatch(updateUiData({ showCalendar: false }))}>收起</View>
          </View>
          :
          <Swiper style={{ height: '124rpx' }} current={currentSwiper} duration={250}>
            {
              weekDataList.map((weekData, wi) => {
                const weekIndex_ = dayLineMatrix.indexOf(weekData)
                if (weekIndex === weekIndex_ && currentSwiper !== wi) {
                  setCurrentSwiper(wi)
                }
                return (
                  <SwiperItem key={wi}>
                    <View className='eventTimePicker-dayLine'>
                      {
                        weekData.map((dayData, dayIndex_) => (
                          <View className='eventTimePicker-dayLine-item' key={dayData.dateZh}>
                            <View
                              className={`eventTimePicker-dayLine-box ${dayLineMatrix.length === 0 && 'eventTimePicker-dayLine-box_static'} eventTimePicker-dayLine-box_${(dayIndex === dayIndex_ && weekIndex === weekIndex_) ? 'active' : ''}`}
                              onClick={() => handleClickDay(dayIndex_, weekIndex_)}
                            >
                              <View className='eventTimePicker-dayLine-box_day'>
                                {dayData.dayZh}
                              </View>
                              <View className='eventTimePicker-dayLine-box_date'>
                                {parseInt(dayData.dateZh.split('/')[2])}
                              </View>
                            </View>
                            {
                              (dayIndex_ === currentDayIndex && weekIndex_ === currentWeekIndex) &&
                              <View className='eventTimePicker-dayLine-item_arrow'>
                                <IconFont name='arrow-up-filling' size={24} color='#aaaaaa' />
                              </View>
                            }
                          </View>
                        ))
                      }
                    </View>
                  </SwiperItem>
                )
              })
            }

          </Swiper>

      }
    </View>
  )
}

