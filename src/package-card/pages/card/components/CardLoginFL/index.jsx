import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import CustomButton from '../../../../../components/CustomButton'
import encoding from '../../../../utils/encoding'

import './index.scss'


function CardLoginFL(props) {
  const { cardKey, cardLoginFLData, setCardLoginFLData, onClose } = props
  const { isOpened, name, passwd, rand } = cardLoginFLData

  const [randImg, setRandImg] = useState('')

  // 获取验证码图片
  const getRandImg = useCallback(
    async () => {
      Taro.downloadFile({
        url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/getCheckpic.action',
        header: {
          'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
        },
        success(res) {
          // 保存数据到本地
          setRandImg(res.tempFilePath)
        }
      })
    },
    [cardKey],
  )

  useEffect(() => {
    if (cardKey) {
      getRandImg()
    }
  }, [cardKey, getRandImg])

  // 登陆请求
  const loginReq = () => {
    if (!cardLoginFLData.name || !cardLoginFLData.passwd) {
      return Taro.showToast({
        title: '请填写全信息',
        icon: 'none',
        duration: 1000
      })
    }

    // 请求验证逻辑
    Taro.showLoading({
      title: '登陆中...',
      mask: true,
    })

    Taro.request({
      url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421a1a013d2746126022a50c7fec8/loginstudent.action',
      data: {
        ...cardLoginFLData,
        userType: 1,
        loginType: 2,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': `wengine_vpn_ticketwebvpn_hfut_edu_cn=${cardKey};`,
      },
      responseType: 'arraybuffer',
    })
      .then(res => {
        const results = new encoding.TextDecoder('gbk').decode(new Uint8Array(res.data))
        Taro.hideLoading()
        const title = results.split('</title>')[0].split('<title>')[1]
        if (title === '校园卡查询系统-持卡人查询界面') {
          // 登陆正常
          setCardLoginFLData({
            ...cardLoginFLData,
            isOpened: false,
            verify: true,
          })
          Taro.showToast({
            title: '验证成功',
            icon: 'success',
            duration: 1000
          })
        }
        else {
          const info = results.split('<p class="biaotou" >')[1].split('</p>')[0]
          Taro.showToast({
            title: info,
            icon: 'none',
            duration: 1500
          })
        }
      })

  }


  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='settingFloatLayout'
      onClose={onClose}
    >
      <View className='settingFloatLayout-header'>
        登陆校园卡平台
      </View>

      <View className='settingFloatLayout-content'>

        <View className='cardLoginFL-content-item'>
          <Input
            className='cardLoginFL-content-item-input'
            border={false}
            placeholder='请输入学号'
            placeholder-style='color:#ccc;'
            value={name}
            onInput={e => setCardLoginFLData({ ...cardLoginFLData, name: e.detail.value })}
          />
        </View>

        <View className='cardLoginFL-content-item'>
          <Input
            className='cardLoginFL-content-item-input'
            border={false}
            placeholder='请输入密码（身份证后六位）'
            placeholder-style='color:#ccc;'
            value={passwd}
            onInput={e => setCardLoginFLData({ ...cardLoginFLData, passwd: e.detail.value })}
          />
        </View>

        <View className='cardLoginFL-content-item'>
          <Image className='cardLoginFL-content-item-rand' mode='aspectFit' src={randImg} onClick={getRandImg} />
          <Input
            className='cardLoginFL-content-item-input'
            border={false}
            placeholder='验证码（不用输'
            placeholder-style='color:#ccc;'
            value={rand}
            onInput={e => setCardLoginFLData({ ...cardLoginFLData, rand: e.detail.value })}
          />
        </View>

      </View>

      <View className='settingFloatLayout-footer'>
        <View className='settingFloatLayout-footer-btnBox'>
          <CustomButton value='登录' type='call' onSubmit={loginReq} />
        </View>
      </View>

    </AtFloatLayout >
  )
}


export default CardLoginFL
