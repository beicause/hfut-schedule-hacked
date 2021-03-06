import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Picker } from '@tarojs/components'
import { AtFloatLayout, AtList, AtListItem } from 'taro-ui'

import CustomButton from '../../../../../../components/CustomButton'
import { updateScheduleData, updateBizData } from '../../../../../../actions/allSchedule'
import IconFont from '../../../../../../components/iconfont'
import semesterData from '../../../../../../assets/data/semesterData'
import './index.scss'

export default (props) => {
  const { isOpened, onClose } = props
  const selectInfo = useSelector(state => state.allSchedule.bizData.selectInfo)
  const dispatch = useDispatch()

  const [selectedAcademy, setSelectedAcademy] = useState('')
  const [majorList, setMajorList] = useState([])
  const [selectedMajor, setSelectedMajor] = useState('')
  const [levelList, setLevelList] = useState([])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [clazzList, setClazzList] = useState([])
  const [selectedClazz, setSelectedClazz] = useState('')

  const [selectedSemester, setSelectedSemester] = useState(semesterData[1])

  const handleAcademyChange = (e) => {
    const academy = Object.keys(selectInfo)[e.detail.value]
    setSelectedAcademy(academy)
    const majorObj = selectInfo[academy]
    setMajorList(Object.keys(majorObj))
    setClazzList([])
    setSelectedMajor('')
    setSelectedClazz('')
  }

  const handleMajorChange = (e) => {
    const major = Object.keys(selectInfo[selectedAcademy])[e.detail.value]
    setSelectedMajor(major)
    const levelObj = selectInfo[selectedAcademy][major]
    let levelList_ = []
    Object.keys(levelObj).map((level) => {
      if (levelObj[level].length > 0) {
        levelList_.push(level)
      }
    })
    setLevelList(levelList_.reverse())

    if (selectedLevel) {
      const clazzes = selectInfo[selectedAcademy][major][selectedLevel]
      setClazzList(clazzes)
    }
    setSelectedClazz('')
  }

  const handleLevelChange = (e) => {
    const level = levelList[e.detail.value]
    setSelectedLevel(level)
    const clazzes = selectInfo[selectedAcademy][selectedMajor][level]
    setClazzList(clazzes)
    setSelectedClazz('')
  }

  const handleClazzChange = (e) => {
    const clazz = clazzList[e.detail.value]
    setSelectedClazz(clazz)
  }

  const handleQuery = async () => {
    if (!selectedClazz) { return }
    await dispatch(updateBizData({ level: selectedLevel }))
    const queryStatus = await dispatch(updateScheduleData({ clazz: selectedClazz, level: selectedLevel, semesterId: selectedSemester.id }))
    if (queryStatus) {
      onClose()
    }
  }

  const selectsData = [
    {
      title: '选择学院',
      extraText: selectedAcademy,
      range: Object.keys(selectInfo),
      onChange: handleAcademyChange,
    },
    {
      title: '选择专业',
      extraText: selectedMajor,
      range: majorList,
      onChange: handleMajorChange,
    },
    {
      title: '选择年级',
      extraText: selectedLevel,
      range: levelList,
      onChange: handleLevelChange,
    },
    {
      title: '选择班级',
      extraText: selectedClazz,
      range: clazzList,
      onChange: handleClazzChange,
    },
  ]

  const handleSemesterChange = e => {
    setSelectedSemester(semesterData[e.detail.value])
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='selectFloatLayout'
      onClose={onClose}
    >
      <View className='selectFloatLayout-header'>
        选择班级
        <View className='selectFloatLayout-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='selectFloatLayout-content'>

        <View className='selectFloatLayout-content-item' >
          <Picker
            mode='selector'
            range={semesterData}
            value={semesterData.indexOf(selectedSemester)}
            rangeKey='nameZh'
            onChange={handleSemesterChange}
            className='courseSearch-drawer-type'
          >
            <AtList className='selectFloatLayout-content-item' hasBorder={false}>
              <AtListItem
                title={selectedSemester.nameZh}
                hasBorder={false}
              />
            </AtList>
          </Picker>
        </View>

        {
          selectsData.map((selectData) => {
            const { title, extraText, range, onChange } = selectData
            return (
              <View className='selectFloatLayout-content-item' key={title} >
                <Picker mode='selector' range={range} onChange={onChange}>
                  <AtList className='selectFloatLayout-content-item' hasBorder={false}>
                    <AtListItem
                      title={title}
                      extraText={extraText}
                      hasBorder={false}
                    />
                  </AtList>
                </Picker>
              </View>
            )
          })
        }

      </View>

      <View className='selectFloatLayout-footer'>
        <CustomButton
          value='查询'
          type='call'
          onSubmit={handleQuery}
        />
      </View>
    </AtFloatLayout>
  )
}
