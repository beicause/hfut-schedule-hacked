import React, { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { AtTimeline, AtActivityIndicator, AtProgress } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components'
import { EChart } from "echarts-taro3-react";

import { UPDATE_BIZDATA } from '../../../constants/package-card/card'
import CustomButton from '../../../components/CustomButton'
import CardLoginFL from './components/CardLoginFL'
import IconFont from '../../../components/iconfont'
import themeC from '../../../style/theme'
import { GET } from '../../../utils/request'
import encoding from '../../utils/encoding'
import recordTranslator from '../../utils/recordTranslator'
import { basicCalculate } from '../../utils/calculate'
import save from '../../utils/save'
import EmptyImg from '../../../assets/img/empty.svg'
import './index.scss'


function Card(props) {
  const { bizData, globalTheme } = props
  const { recordDataList, basicAnalyzedData } = bizData

  const dispatch = useDispatch()
  const [cardKey, setKey] = useState('')
  const [cardLoginFLData, setCardLoginFLData] = useState({
    isOpened: false,
    name: '',
    passwd: '',
    rand: '',
    verify: false,
  })
  const [timelineData, setTimelineData] = useState([
    { title: '准备账单生成环境...', icon: 'check-circle' },
  ])
  const [progressData, setProgressData] = useState({
    show: false,
    percent: 0,
    status: 'progress',
  })
  // 用来做loading完成后的淡出效果
  const [loadingOpacity, setLoadingOpacity] = useState(1)
  // 图表实例
  const consumeRateChart = useRef(null);


  // 适配全局主题，判断是否需要登陆
  useDidShow(() => {
    if (!cardLoginFLData.verify && recordDataList.length === 0) {
      Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] })
      // 打开登陆弹窗
      setTimeout(() => setCardLoginFLData(preState => ({ ...preState, isOpened: true })));
    }
  })


  // 用户刚进入模块时的effect

  useEffect(() => {
    const localCardData = Taro.getStorageSync('package-card')
    let { recordDataList: localRecordDataList, basicAnalyzedData: localBasicAnalyzedData } = localCardData
    // 首次进入，本地无数据
    if (!cardKey && (!localRecordDataList || !localBasicAnalyzedData)) {
      // 获取一个vpn key
      GET('/vpn_ticket')
        .then(res => setKey(res.key))
    }
    // 有本地分析过的数据，就渲染本地的
    else if (localRecordDataList && localBasicAnalyzedData) {
      Taro.setNavigationBarColor({ frontColor: '#000000', backgroundColor: '#ffffff' })
      dispatch({
        type: UPDATE_BIZDATA,
        payload: { recordDataList: localRecordDataList, basicAnalyzedData: localBasicAnalyzedData },
      })
    }
  }, [cardKey, dispatch])


  // 检测到验证完成，执行生成账单的逻辑
  // 这里比较长，包含了整个处理逻辑
  useEffect(() => {
    if (!cardLoginFLData.verify) {
      return
    }

    if (timelineData.length !== 1) {
      return
    }

    const generateFlow = async () => {

      // 1. 请求个人信息
      const selfinfoRes = await Taro.request({
        url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/accountcardUser.action',
        method: 'GET',
        header: {
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
        responseType: 'arraybuffer',
      })
      // gbk转码
      const selfinfoRresults = new encoding.TextDecoder('gbk').decode(new Uint8Array(selfinfoRes.data))
      // 获取卡片ID
      const cardID = selfinfoRresults.split('<td width="10%" class="neiwen">')[1].split('<td colspan="2"')[0].split('left">')[1].split('</div>')[0]

      // 2. 选择查询类型all
      await Taro.request({
        url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/accounthisTrjn1.action',
        data: {
          account: cardID,
          inputObject: 'all',
          Submit: '+%C8%B7+%B6%A8+',
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
      })

      // 3. 选择查询时间
      await Taro.request({
        url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/accounthisTrjn2.action',
        data: {
          inputStartDate: '20200901',
          inputEndDate: '20210110',
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
      })

      setTimelineData([
        { title: '准备账单生成环境', color: 'green', icon: 'check-circle' },
        { title: '正在查询数据库（可能需要几秒）...', icon: 'check-circle' },
      ])

      // 4. 触发查询
      const queryTriggerRes = await Taro.request({
        url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/accounthisTrjn3.action',
        method: 'POST',
        header: {
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
        responseType: 'arraybuffer',
      })
      // gbk转码
      const queryTriggerRresults = new encoding.TextDecoder('gbk').decode(new Uint8Array(queryTriggerRes.data))
      // 获取必要数据
      const recordTime = queryTriggerRresults.split('本次查询共涉及:')[1].split('次交易')[0]
      const totalMoney = queryTriggerRresults.split('总计交易额为:')[1].split('（元）')[0]
      const totalPages = queryTriggerRresults.split(';共')[1].split('页')[0]

      setTimelineData([
        { title: '准备账单生成环境', color: 'green', icon: 'check-circle' },
        { title: '查询完成', content: [`总计${recordTime}次交易，总金额${totalMoney}元`], color: 'green', icon: 'check-circle' },
        { title: '正在进行数据分析...', icon: 'check-circle' },
      ])

      // 5. 循环获取每页的数据
      let recordDataList_ = []
      for (let page = 1; page <= totalPages; page++) {
        const singlePageRes = await Taro.request({
          url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/accountconsubBrows.action',
          data: {
            pageNum: page,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
          },
          responseType: 'arraybuffer',
        })
        // gbk转码
        const singlePageRresults = new encoding.TextDecoder('gbk').decode(new Uint8Array(singlePageRes.data))
        // 解析html，并存入recordDataList_
        recordDataList_ = recordDataList_.concat(recordTranslator(singlePageRresults))
        // 更新进度条
        const percent = parseInt((page / totalPages) * 100)
        if (percent === 100) {
          // 进度条满了，先显示完成，再隐藏进度条
          setProgressData(preState => ({ ...preState, percent, status: 'success' }))
          setTimeout(() => {
            setProgressData(preState => ({ ...preState, show: false }))
            setTimelineData([
              { title: '准备账单生成环境', color: 'green', icon: 'check-circle' },
              { title: '查询完成', content: [`总计${recordTime}次交易，总金额${totalMoney}元`], color: 'green', icon: 'check-circle' },
              { title: '数据分析完成', color: 'green', icon: 'check-circle' },
              { title: '正在生成账单...', icon: 'check-circle' },
            ])
          }, 500);
        } else {
          // 进度条未满
          setProgressData(preState => ({ ...preState, show: true, percent }))
        }
      }

      // 这里就已经拿到数据啦。接下来存一下这些数据（只存recordDataList_）
      save(cardLoginFLData.name, cardLoginFLData.passwd, recordDataList_)

      // 开始渐变动画
      setTimeout(() => {
        setLoadingOpacity(0)
        Taro.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
          animation: {
            duration: 1000,
            timingFunc: 'easeIn'
          }
        })
      }, 800);


      // 开始渲染账单
      setTimeout(() => {
        // 先进行分类计算
        const basicAnalyzedData_ = basicCalculate(recordDataList_)

        // 存到全局store里
        dispatch({
          type: UPDATE_BIZDATA,
          payload: { recordDataList: recordDataList_, basicAnalyzedData: basicAnalyzedData_ },
        })

        // 存在本地
        Taro.setStorage({
          key: 'package-card',
          data: {
            recordDataList: recordDataList_,
            basicAnalyzedData: basicAnalyzedData_,
          }
        })

      }, 1800);

    }

    generateFlow()

  }, [cardKey, cardLoginFLData, dispatch, globalTheme, timelineData])


  // 绘制账单ui的effect

  useEffect(() => {
    if (recordDataList.length === 0) {
      return
    }

    // 绘制月日均消费图表
    const { months, monthsDaily } = basicAnalyzedData
    consumeRateChart.current.refresh({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months
      },
      yAxis: {},
      series: [{
        name: '日均消费',
        data: monthsDaily,
        type: 'line',
        lineStyle: {
          color: themeC[`color-brand-${globalTheme}`]
        },
        itemStyle: {
          color: themeC[`color-brand-dark-${globalTheme}`]
        },
        areaStyle: {
          color: themeC[`color-brand-dark-${globalTheme}`],
          opacity: 0.2
        },
        borderWidth: 4,
      }]
    })
  }, [recordDataList, basicAnalyzedData, globalTheme])


  // 点击刷新账单

  const handleRefreshClick = () => {
    Taro.showModal({
      title: '确定要重新生成吗',
      confirmText: '确定',
      confirmColor: '#f33f3f',
      cancelColor: '#60646b',
      success: function (res) {
        if (res.confirm) {
          // 点击确定，执行清除数据操作
          Taro.removeStorage({ key: 'package-card' })
          dispatch({
            type: UPDATE_BIZDATA,
            payload: { recordDataList: [], basicAnalyzedData: {} },
          })
          Taro.reLaunch({ url: '/package-card/pages/card/index' })
        }
      }
    })
  }


  // 数据未获取完成，渲染login或loading

  if (recordDataList.length === 0) {
    return (
      <View className='cardPrepare'>

        {
          cardLoginFLData.verify ?
            <View className={`cardPrepare-loading cardPrepare-loading_${loadingOpacity}`} >

              <AtActivityIndicator content='账单正在生成，请耐心等待（不要退出界面）...'></AtActivityIndicator>

              <View className='cardPrepare-loading-content'>
                <AtTimeline
                  items={timelineData}
                >
                </AtTimeline>
                {/* 进度条 */}
                {progressData.show && <AtProgress percent={progressData.percent} status={progressData.status} color={themeC[`color-brand-dark-${globalTheme}`]} />}
              </View>

            </View>
            :
            <View className='cardPrepare-login'>
              <View className='cardPrepare-login-none'>
                <Image
                  src={EmptyImg}
                  className='cardPrepare-login-none-noneImg'
                />
                <Text className='cardPrepare-login-none-noneText'>请先登陆校园卡平台～</Text>
                <View className='cardPrepare-login-none-btn'>
                  <CustomButton value='开始' type='default' onSubmit={() => setCardLoginFLData(preState => ({ ...preState, isOpened: true }))} />
                </View>
              </View>
            </View>
        }

        <CardLoginFL
          cardKey={cardKey}
          cardLoginFLData={cardLoginFLData}
          setCardLoginFLData={setCardLoginFLData}
          onClose={() => setCardLoginFLData(preState => ({ ...preState, isOpened: false }))}
        />

      </View>
    )
  }


  // 数据获取完成，渲染账单内容

  return (
    <View className='cardMain'>
      <View className='cardMain-shadow'></View>

      <View className='cardMain-header'>
        <View className='cardMain-header-row'>
          <Text className='cardMain-header-row-text1'>我刷掉的</Text>
          <Text className='cardMain-header-row-text2'>共计{basicAnalyzedData.spentTime}笔   合计</Text>
        </View>
        <View className='cardMain-header-row'>
          <Text className='cardMain-header-row-text3'>¥{basicAnalyzedData.spentSum}</Text>
        </View>
        <View className='cardMain-line'></View>
        <View className='cardMain-header-refresh' onClick={handleRefreshClick}>
          <IconFont name='swap' size={42} color='#60646b' />
        </View>
      </View>

      <View className='cardMain-content'>
        <View className='cardMain-content-title'>消费分类</View>
        {
          basicAnalyzedData.ranking.map(data => (
            <View className='cardMain-content-row' key={data.index}>
              <View className='cardMain-content-row-left'>
                <IconFont name='creditcard' size={48} color='#60646b' />
              </View>
              <View className='cardMain-content-row-right'>
                <View className='cardMain-content-row-right-top'>
                  <View>
                    <Text className='cardMain-content-row-right-top-text1'>{data.name}</Text>
                    <Text className='cardMain-content-row-right-top-text2'> {data.rate}%</Text>
                  </View>
                  <View>
                    <Text className='cardMain-content-row-right-top-text1'>¥{data.money}</Text>
                  </View>
                </View>
                <View className='cardMain-content-row-right-bottom'>
                  <AtProgress percent={data.rate * 1} color={themeC[`color-brand-${globalTheme}`]} isHidePercent />
                </View>
              </View>
            </View>
          ))
        }

        <View className='cardMain-content-btnbox'>
          <View className='cardMain-content-btnbox-btn' onClick={() => Taro.navigateTo({ url: '/package-card/pages/card-custom/index' })}>
            <IconFont name='round_like_fill' size={36} color={themeC[`color-brand-dark-${globalTheme}`]} />
            <Text className='cardMain-content-btnbox-btn-text'>干饭人报告</Text>
          </View>
          <View className='cardMain-content-btnbox-btn' onClick={() => Taro.navigateTo({ url: '/package-card/pages/card-ranking/index' })}>
            <IconFont name='round_rank_fill' size={36} color={themeC[`color-brand-dark-${globalTheme}`]} />
            <Text className='cardMain-content-btnbox-btn-text'>消费排行榜</Text>
          </View>
        </View>

        <View className='cardMain-line'></View>

      </View>

      <View className='cardMain-footer'>
        <View className='cardMain-footer-title'>每月日均消费</View>
        <EChart ref={consumeRateChart} canvasId='bar-canvas' />
      </View>

    </View>
  )


}

function mapStateToProps(state) {
  return {
    ...state.card,
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
  };
}

export default connect(mapStateToProps)(Card);
