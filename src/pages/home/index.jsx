import React, { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, OpenData } from '@tarojs/components'
import { AtBadge } from 'taro-ui'
import dayjs from 'dayjs';

import IconFont from '../../components/iconfont'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import HelpNotice from '../../components/HelpNotice'
import { homeHelpInfo } from '../../assets/data/helpInfo'
import UpdateNotice from '../../components/UpdateNotice'
import SettingFloatLayout from './components/SettingFloatLayout'
import GlobalThemePicker from './components/GlobalThemePicker'
import themeC from '../../style/theme'
import * as scheduleActions from '../../actions/schedule'
import './index.scss'

let avatarClick = 0

function Home() {
  const examData = useSelector(state => state.event.bizData.examData)
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)
  const showDonate = useSelector(state => state.schedule.bizData.userConfig.showDonate)
  const fineModel = useSelector(state => state.schedule.bizData.autoConfig.fineModel)
  const [sno, setSno] = useState('')
  const [showAbout, setShowAbout] = useState(false)
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)
  const [showHelpNotice, setShowHelpNotice] = useState(false)
  const [showHomeRedPoint, setShowHomeRedPoint] = useState(false)
  const [statusBarHeight, setStatusBarHeight] = useState(28)
  const [showSetting, setShowSetting] = useState(false)
  const [showGlobalThemePicker, setShowGlobalThemePicker] = useState(false)
  const dispatch = useDispatch()

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  useEffect(() => {
    const localUserData = Taro.getStorageSync('me')
    const { userInfo: { username } } = localUserData
    const localConfig = Taro.getStorageSync('config')
    const { autoConfig: { showHomeRedPoint: showHomeRedPoint_ } } = localConfig
    setShowHomeRedPoint(showHomeRedPoint_)
    if (showHomeRedPoint_) {
      setTimeout(() => {
        setShowHomeRedPoint(false)
        Taro.setStorage({
          key: 'config',
          data: {
            ...localConfig,
            autoConfig: {
              ...localConfig.autoConfig,
              showHomeRedPoint: false,
            }
          }
        })
      }, 10000);
    }
    setSno(username)

    // 获取系统状态栏高度
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])

  let examCount = 0
  examData.map(exam => {
    const { timeText } = exam
    if (dayjs().isBefore(dayjs(timeText.split('~')[0]))) {
      examCount++
    }
  })

  const cardData = [
    {
      name: '考试安排',
      icon: 'daibanshixiang',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/exam-arrange/index' }),
      redPoint: (examCount !== 0) && (<AtBadge value={examCount}></AtBadge>),
    },
    {
      name: '第二课堂',
      icon: 'jixiaopinggu',
      onClick: () => Taro.navigateToMiniProgram({
        appId: 'wx1e3feaf804330562',
        path: 'pages/my/my',
      }),
      redPoint: '',
    },
    {
      name: '校园卡',
      icon: 'gongpai',
      onClick: () => Taro.navigateTo({ url: '/package-card/pages/card/index' }),
      redPoint: '',
    },
  ]

  const toolsData = [
    {
      name: '全校课表',
      icon: 'rili',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/all-schedule/index' }),
      redPoint: '',
    },
    {
      name: '空教室查询',
      icon: 'tishi',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/index' }),
      redPoint: '',
    },
    {
      name: '图书馆馆藏查询',
      icon: 'sousuo',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/book-search/index' }),
      redPoint: '',
    },
    {
      name: '课程/教师检索',
      icon: 'shuju',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/course-search/index' }),
      redPoint: '',
    },
  ]

  const handleClickCoin = () => {
    Taro.navigateTo({ url: '/pages/home/pages/donate/index' })
  }

  // 连续点击5次头像，除非美好模式
  const handleClickAvatar = () => {
    avatarClick += 1
    setTimeout(() => {
      avatarClick -= 1
    }, 4000);

    if (avatarClick === 5) {
      const localConfig = Taro.getStorageSync('config')

      dispatch(scheduleActions.updateBizData({
        autoConfig: {
          ...localConfig.autoConfig,
          fineModel: !fineModel,
        }
      }))
      Taro.setStorage({
        key: 'config',
        data: {
          ...localConfig,
          autoConfig: {
            ...localConfig.autoConfig,
            fineModel: !fineModel,
          }
        }
      })
      Taro.showModal({
        title: '如你所愿',
        content: fineModel ? '开发者模式已关闭' : '开发者模式已开启',
        showCancel: false,
        confirmText: '👌',
      })
    }

  }


  return (
    <View className='home'>
      <View className='home-nav' style={{ top: statusBarHeight + 10 }} onClick={() => setShowSetting(true)} >
        <IconFont name='shezhi' size={54} color='#ffffff' />
      </View>

      <View className='home-header' style={{ paddingTop: statusBarHeight + 58, backgroundImage: `linear-gradient(180deg, ${themeC[`color-brand-dark-${globalTheme}`]} 76%, ${themeC['color-background']} 100%)` }}>

        <View className='home-header-avatar'>

          <View className='home-header-avatar-img' onClick={handleClickAvatar}>
            <OpenData type='userAvatarUrl'></OpenData>
          </View>

          {
            showDonate &&
            <View class='home-header-coin' onClick={handleClickCoin}>
              <View class='home-header-coin-front'></View>
              <View class='home-header-coin-front_b'></View>
              <View class='home-header-coin-back'></View>
              <View class='home-header-coin-back_b'></View>
            </View>
          }
        </View>
        <View className='home-header-nickName'>
          <Text>{sno ? sno : '0000000000'}</Text>
        </View>
      </View>

      <View className='home-content'>
        <View className='home-content-card'>
          {
            cardData.map(data => (
              <View key={data.name} className='home-content-card-box' onClick={data.onClick}>
                <IconFont name={data.icon} size={68} />
                <View className='home-content-card-box-nameBox'>
                  <View className='home-content-card-box-nameBox_redPoint'>{data.redPoint}</View>
                  <Text className='home-content-card-box-nameBox_name'>{data.name}</Text>
                </View>
              </View>
            ))
          }
        </View>

        <View className='home-content-group'>
          {
            toolsData.map(data => (
              <View key={data.name} className='home-content-group-item' onClick={data.onClick}>
                <View className='home-content-group-item-left'>
                  <IconFont name={data.icon} size={48} color='#60646b' />
                  <View className='home-content-group-item-left-nameBox'>
                    {/* <View className='home-content-group-item-left-nameBox_redPoint'>{data.redPoint}</View> */}
                    <View className='home-content-group-item-left-nameBox_redPoint'>{(showHomeRedPoint && data.redPoint) && <AtBadge dot></AtBadge>}</View>
                    <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                  </View>
                </View>
                <IconFont name='arrow-right' size={48} color='#60646b' />
              </View>
            ))
          }
        </View>

        <View className='home-content-group home-content-group_2'>

          <View className='home-content-group-item' onClick={() => setShowAbout(true)}>
            <View className='home-content-group-item-left'>
              <IconFont name='tanhao' size={46} color='#60646b' />
              <View className='home-content-group-item-left-nameBox'>
                {/* <View className='home-content-group-item-left-nameBox_redPoint'>{showHomeRedPoint && <AtBadge dot></AtBadge>}</View> */}
                <Text style={{ marginLeft: 10 }}>用前必读</Text>
              </View>
            </View>
            <IconFont name='' size={46} color='#60646b' />
          </View>

          <View className='home-content-group-item' onClick={() => Taro.navigateTo({ url: '/pages/home/pages/feedback-update/index' })}>
            <View className='home-content-group-item-left'>
              <IconFont name='taolunqu' size={46} color='#60646b' />
              <View className='home-content-group-item-left-nameBox'>
                {/* <View className='home-content-group-item-left-nameBox_redPoint'>{showHomeRedPoint && <AtBadge dot></AtBadge>}</View> */}
                <Text style={{ marginLeft: 10 }}>反馈与更新</Text>
              </View>
            </View>
            <IconFont name='arrow-right' size={46} color='#60646b' />
          </View>

        </View>

      </View>

      <StandardFloatLayout
        isOpened={showAbout}
        onClose={() => setShowAbout(false)}
        title='用前必读'
        content={`本小程序不代表任何组织或机构的利益，完全出于交流学习和方便工大学子的目的而开发。\n
        小程序大部分功能都依靠于学校的系统，如果学校的系统发生异常小程序也可能会受到影响，希望同学们理解！\n
        本项目已在GitHub开源，仓库名称为：hfut-schedule-hacked。欢迎志同道合的同学与我一起交流、参与开发。\n
        人生海海，各有解答。当你选择，就是答案。
        `}
        buttons={[{
          value: '查看帮助',
          onClick: () => { setShowAbout(false); setShowHelpNotice(true) }
        }, {
          value: '更新公告',
          onClick: () => { setShowAbout(false); setShowUpdateNotice(true) }
        }]}
      />

      { showUpdateNotice && <UpdateNotice onClose={() => setShowUpdateNotice(false)} />}
      { showHelpNotice && <HelpNotice onClose={() => setShowHelpNotice(false)} helpInfo={homeHelpInfo} />}

      <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
        openGlobalTheme={() => setShowGlobalThemePicker(true)}
        closeGlobalTheme={() => setShowGlobalThemePicker(false)}
      />

      <GlobalThemePicker isOpened={showGlobalThemePicker} onClose={() => setShowGlobalThemePicker(false)} />

    </View>
  )
}

export default Home;
