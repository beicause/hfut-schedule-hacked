import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Picker } from '@tarojs/components'
import moment from 'moment'

import StandardFloatLayout from '../../../../components/StandardFloatLayout'
import { updateScheduleData, refreshColor } from '../../../../actions/schedule'
import { logout } from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import LittleMenu from '../../../../components/LittleMenu'
import './index.less'

export default (props) => {
  const { weekIndex, currentWeekIndex, changeWeekIndex } = props
  const [showMenu, setShowMenu] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const dispatch = useDispatch()

  const daysZh = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  const weekIndexes = [
    { name: '第1周', index: 1 },
    { name: '第2周', index: 2 },
    { name: '第3周', index: 3 },
    { name: '第4周', index: 4 },
    { name: '第5周', index: 5 },
    { name: '第6周', index: 6 },
    { name: '第7周', index: 7 },
    { name: '第8周', index: 8 },
    { name: '第9周', index: 9 },
    { name: '第10周', index: 10 },
    { name: '第11周', index: 11 },
    { name: '第12周', index: 12 },
    { name: '第13周', index: 13 },
    { name: '第14周', index: 14 },
    { name: '第15周', index: 15 },
    { name: '第16周', index: 16 },
    { name: '第17周', index: 17 },
    { name: '第18周', index: 18 },
    { name: '第19周', index: 19 },
    { name: '第20周', index: 20 },
  ]
  
  const refreshColor_ = () => {
    dispatch(refreshColor())
  }

  const refreshData = () => {
    dispatch(updateScheduleData())
  }

  const logout_ = () => {
    dispatch(logout())
  }

  const menuList = [
    {
      value: '刷新颜色',
      icon: 'swap',
      onClick: refreshColor_,
    },
    {
      value: '更新数据',
      icon: 'sync',
      onClick: refreshData,
    },
    {
      value: '用前必读',
      icon: 'file-text',
      onClick: () => setShowAbout(true),
    },
    {
      value: '退出登录',
      icon: 'login',
      onClick: logout_,
    },
  ]

  const handlePickerChange = (e) => {
    const weekIndex_ = parseInt(e.detail.value)
    changeWeekIndex(weekIndex_)
  }

  return (
    <View className='scheduleTop'>
      <Picker mode='selector'
        range={weekIndexes}
        rangeKey='name'
        value={weekIndex}
        onChange={e => handlePickerChange(e)}
      >
        <View className='scheduleTop-title'>
          {`第${weekIndex + 1}周 ` + (currentWeekIndex === weekIndex ? `（当前${daysZh[moment().day() - 1]}）` : `（当前第${currentWeekIndex + 1}周）`)}
          <View className='scheduleTop-title-icon'>
            <IconFont name='icon-test' size={46} color='#ffffff' />
          </View>
        </View>
      </Picker>

      <View className='scheduleTop-operation' onClick={() => setShowMenu(!showMenu)}>
        <IconFont name='plus' size={42} color='#ffffff' />
      </View>
      <LittleMenu menuList={menuList} showMenu={showMenu} />
      {
        showMenu &&
        <View onClick={() => setShowMenu(false)} className='scheduleTop-mask'></View>
      }

      <StandardFloatLayout
        isOpened={showAbout}
        onClose={() => setShowAbout(false)}
        title='用前必读'
        content={`本小程序不代表任何组织或机构的利益，完全出于交流学习和方便工大学子的目的而开发。\n
        由于测试样本较少，部分课程可能会显示不正确（比如1小时和3小时的课）。如在使用中发现bug可以联系开发者（qq：254139147）进行修复。\n
        本项目已在GitHub开源，仓库名称为：hfut_schedule_hacker。欢迎对前端感兴趣的同学与我一起交流和开发！
        `}
        buttons={[{
          value: '知道了',
          color: 'blue',
          onClick: () => setShowAbout(false)
        }]}
      />
      
    </View>

  )
}
