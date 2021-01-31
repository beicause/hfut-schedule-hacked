/* eslint-disable import/no-commonjs */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import _ from 'lodash'

import * as actions from '../../actions/score'
import formatScore from './utils/formatScore'
import IconFont from '../../components/iconfont'
import SettingFloatLayout from './components/SettingFloatLayout'
import F2Canvas from '../../components/F2Canvas/index'
import themeC from '../../style/theme'
import './index.scss'

// 引入F2
const F2 = require('@antv/f2/lib/core')
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
const GroupAnimation = require('@antv/f2/lib/animation/detail');
const Legend = require('@antv/f2/lib/plugin/legend');

F2.Chart.plugins.register(Tooltip);
F2.Chart.plugins.register(GroupAnimation);
F2.Chart.plugins.register(Legend);
require('@antv/f2/lib/geom/line')
require('@antv/f2/lib/geom/point')
require('@antv/f2/lib/geom/area');
// require('@antv/f2/lib/geom/');

function Grade(props) {
  const { bizData: { allRank, termRanks }, globalTheme, hasPub, rankType, scoreDigits, handleData } = props
  const [statusBarHeight, setStatusBarHeight] = useState(28)
  const [showSetting, setShowSetting] = useState(false)
  // const consumeRateChart = useRef(null);

  const bottomBtns = [
    {
      name: '成绩列表',
      icon: 'rili',
      onClick: () => Taro.navigateTo({ url: '/pages/score/pages/score-list/index' }),
    },
    {
      name: '公选学分',
      icon: 'tishi',
      onClick: () => Taro.navigateTo({ url: '/pages/score/pages/pub-credit/index' }),
    },
    {
      name: '其他数据',
      icon: 'shuju',
      onClick: () => Taro.navigateTo({ url: '/pages/score/pages/score-else-data/index' }),
    },
    {
      name: '公选挂科率',
      icon: 'sousuo',
      onClick: () => Taro.navigateTo({ url: '/pages/score/pages/pub-fail-rate/index' }),
    },
  ]

  // 获取系统状态栏高度
  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])

  // 下拉刷新
  usePullDownRefresh(async () => {
    await handleData('main')
  })

  // 设置改变后的effect
  useEffect(() => {
    Taro.showLoading({ title: '加载中' })
    handleData('main')
  }, [handleData, hasPub, rankType])

  // 绘制图表
  const chartOnInit = (config) => {

    let data = []

    data = data.concat(termRanks.map((termData) => ({
      term: termData.term,
      type: '我的',
      value: parseFloat(formatScore(termData.score, scoreDigits)),
    })))
    data = data.concat(termRanks.map((termData) => ({
      term: termData.term,
      type: '平均',
      value: parseFloat(formatScore(termData.avgScore, scoreDigits)),
    })))
    data = data.concat(termRanks.map((termData) => ({
      term: termData.term,
      type: '最高',
      value: parseFloat(formatScore(termData.maxScore, scoreDigits)),
    })))

    const chart = new F2.Chart(config);

    chart.source(data, {
      value: {
        tickCount: 5,
      },
      term: {
        type: 'cat'
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      showCrosshairs: true,
      showItemMarker: false,
      triggerOn: ['click', 'touchstart', 'touchmove'],
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function (item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function (item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.point()
      .position('term*value').style({
        stroke: '#fff',
        lineWidth: 1
      })
      .color('type')

    chart.area()
      .position('term*value')
      .color('type')
    chart.line()
      .position('term*value')
      .color('type')
    chart.render()

    return chart // required
  }

  return (
    <View className='score'>
      <View className='score-title' style={{ top: statusBarHeight + 8 }}></View>
      <View className='score-shadow' style={{ backgroundColor: themeC[`color-brand-${globalTheme}`] }}></View>

      <View className='score-card'>
        <View className='score-header-top'>

          <View className='score-header-top-left'>
            <Text className='score-title_small'>{`专业排名 - ${rankType === 'Gpa' ? '绩点' : '均分'}`}</Text>
            <Text className='score-title_huge'>{`${allRank.rank}/${allRank.sum}`}</Text>
          </View>

          <View
            className='score-header-top-right'
            style={{ backgroundColor: themeC[`color-brand-${globalTheme}`] }}
            onClick={() => setShowSetting(true)}
          >
            <IconFont name='shezhi' size={64} color='#ffffff' />
          </View>

        </View>
        <View className='score-header-bottom'>

          <View className='score-header-bottom-box'>
            <IconFont name='bussiness-man' size={48} color={themeC['color-grey']} />
            <View className='score-header-bottom-box-right'>
              <Text className='score-title_small'>我的成绩</Text>
              <Text className='score-header-bottom-box-right-number'>{formatScore(allRank.score, scoreDigits)}</Text>
            </View>
          </View>

          <View className='score-header-bottom-box'>
            <IconFont name='Customermanagement' size={48} color={themeC['color-grey']} />
            <View className='score-header-bottom-box-right'>
              <Text className='score-title_small'>专业平均</Text>
              <Text className='score-header-bottom-box-right-number'>{formatScore(allRank.avgScore, scoreDigits)}</Text>
            </View>
          </View>

          <View className='score-header-bottom-box'>
            <IconFont name='hot' size={48} color={themeC['color-grey']} />
            <View className='score-header-bottom-box-right'>
              <Text className='score-title_small'>专业最高</Text>
              <Text className='score-header-bottom-box-right-number'>{formatScore(allRank.maxScore, scoreDigits)}</Text>
            </View>
          </View>

        </View>
      </View>

      <View className='score-chartPlace'>
        {
          !showSetting &&
          <F2Canvas
            className='score-chartPlace-chart'
            onInit={chartOnInit}
          />
        }
      </View>

      <View className='score-footer'>
        {
          bottomBtns.map((data) => (
            <View key={data.name} className='score-footer-btn' onClick={data.onClick} >
              <IconFont name={data.icon} size={48} color={themeC[`color-brand-${globalTheme}`]} />
              <Text style={{ marginLeft: 10 }}>{data.name}</Text>
            </View>
          ))
        }
      </View>

      <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
      />

    </View>
  )

}


function mapStateToProps(state) {
  return {
    ...state.score,
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
    hasPub: state.schedule.bizData.userConfig.hasPub,
    rankType: state.schedule.bizData.userConfig.rankType,
    scoreDigits: state.schedule.bizData.userConfig.scoreDigits,
  };
}

export default connect(mapStateToProps, actions)(Grade);
