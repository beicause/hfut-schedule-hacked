import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { AtTimeline, AtActivityIndicator } from 'taro-ui'
import { View } from '@tarojs/components'

import CustomButton from '../../../components/CustomButton'
import CardLoginFL from './components/CardLoginFL'
import themeC from '../../../style/theme'
import { GET } from '../../../utils/request'
import encoding from '../../utils/encoding'
import './index.scss'


function Donate() {
  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)
  const [cardKey, setKey] = useState('')
  const [cardLoginFLData, setCardLoginFLData] = useState({
    isOpened: false,
    name: '',
    passwd: '',
    rand: '',
    verify: false,
  })
  const [timelineData, setTimelineData] = useState([
    { title: '准备账单生成环境', icon: 'check-circle' },
  ])

  // 适配全局主题
  useDidShow(() => {
    Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] })
    if (!cardLoginFLData.verify) {
      setTimeout(() => {
        setCardLoginFLData({ ...cardLoginFLData, isOpened: true })
      });
    }
  })

  useEffect(() => {
    if (!cardKey) {
      GET('/vpn_ticket')
        .then(res => setKey(res.key))
    }
  }, [cardKey])


  // 检测到验证完成，执行生成账单的逻辑
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
      let selfinfoRresults = new encoding.TextDecoder('gbk').decode(new Uint8Array(selfinfoRes.data))
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
          inputEndDate: '20201231',
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
      })

      // 准备完成，即将触发查询
      setTimelineData([
        { title: '准备账单生成环境', color: 'green', icon: 'check-circle' },
        { title: '查询数据库', icon: 'check-circle' },
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
      let queryTriggerRresults = new encoding.TextDecoder('gbk').decode(new Uint8Array(queryTriggerRes.data))
      const recordTime = queryTriggerRresults.split('本次查询共涉及:')[1].split('次交易')[0]
      const totalMoney = queryTriggerRresults.split('总计交易额为:')[1].split('（元）')[0]

      setTimelineData([
        { title: '准备账单生成环境', color: 'green', icon: 'check-circle' },
        { title: '查询数据库', content: [`查询到${recordTime}次交易，总金额${totalMoney}元`], color: 'green', icon: 'check-circle' },
        { title: '进行数据分析', icon: 'check-circle' },
      ])

    }

    generateFlow()

  }, [cardKey, cardLoginFLData, timelineData])


  return (
    <View className='card'>

      {
        cardLoginFLData.verify ?
          <View className='card-loading'>
            <AtActivityIndicator content='正在生成账单，请耐心等待...'></AtActivityIndicator>
            <View style={{ marginLeft: 4, marginTop: 18 }}>
              <AtTimeline
                items={timelineData}
              >
              </AtTimeline>
            </View>


          </View>
          :
          <View className='card-login'>
            <CustomButton value='开始' type='default' onSubmit={() => setCardLoginFLData({ ...cardLoginFLData, isOpened: true })} />
          </View>
      }

      <CardLoginFL
        cardKey={cardKey}
        cardLoginFLData={cardLoginFLData}
        setCardLoginFLData={setCardLoginFLData}
        onClose={() => setCardLoginFLData({ ...cardLoginFLData, isOpened: false })}
      />

    </View>
  )

}

export default Donate
