import React, { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtSegmentedControl } from 'taro-ui'
import F2 from '@antv/f2'
import _ from 'lodash'

import F2Canvas from '../../../../components/F2Canvas'
import IconFont from '../../../../components/iconfont'
import themeC from '../../../../style/theme'
import { GET } from '../../../../utils/request'
import './index.scss'


function CardRanking(props) {
  const { globalTheme } = props
  const courseCode = props.tid.split('?')[1].split('&')[0].split('=')[1]
  const term = props.tid.split('?')[1].split('&')[1].split('=')[1]
  const [scoreData, setScoreData] = useState(null)
  const [selectedTag, setSelectedTag] = useState(0)

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  useEffect(() => {
    // 请求这门课的成绩数据
    if (courseCode && term) {
      Taro.showLoading({ title: '加载中' })
      // 先获取学号
      const localUserData = Taro.getStorageSync('me')
      const { userInfo: { username } } = localUserData
      // 请求数据
      GET(`/score/byDetail/${username}/${courseCode}/${term}`)
        .then(res => {
          if (res.success) {
            setScoreData(res.data)
          }
          Taro.hideLoading()
        })
    }
  }, [courseCode, term])

  // 绘制图表
  const chartOnInit = (config) => {
    if (!scoreData) {
      return
    }

    let data = []
    scoreData.courseScoreDetailVOList.forEach(detailData => {
      data.push({
        item: `${detailData.scoreItem}：${detailData.rank}/${detailData.sum}`,
        user: '我的',
        score: detailData.score,
      })
      data.push({
        item: `${detailData.scoreItem}：${detailData.rank}/${detailData.sum}`,
        user: '平均',
        score: detailData.avgScore.toFixed(2),
      })
      data.push({
        item: `${detailData.scoreItem}：${detailData.rank}/${detailData.sum}`,
        user: '最高',
        score: detailData.maxScore,
      })
    });

    const chart = new F2.Chart(config);
    chart.coord('polar');
    chart.source(data, {
      score: {
        // min: 0,
        // max: 100,
        nice: true,
        tickCount: 5
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
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
    chart.axis('score', {
      label: function label(text, index, total) {
        if (index === total - 1) {
          return null;
        }
        return {
          top: true
        };
      },
      grid: {
        lineDash: null,
        type: 'arc' // 弧线网格
      },
      line: {
        top: true
      }
    });
    chart.area().position('item*score').color('user')
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line().position('item*score').color('user')
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.point().position('item*score').color('user')
      .style({
        stroke: '#fff',
        lineWidth: 1
      })
      .animate({
        appear: {
          delay: 300
        }
      });

    chart.render();

    return chart // required
  }

  if (!scoreData) {
    return (
      <View className='oneCS'>
        <View className='oneCS-shadow'></View>
        <View className='oneCS-background' style={{ backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }}></View>
      </View>
    )
  }

  return (
    <View className='oneCS'>
      <View className='oneCS-shadow'></View>
      <View className='oneCS-background' style={{ backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }}></View>

      <View className='oneCS-header'>
        <View className='oneCS-header-left'>
          <Text className='oneCS-header-left-title'>{scoreData.courseItem.courseName}</Text>
          <Text className='oneCS-header-left-comment'>{scoreData.courseItem.courseCode}</Text>
        </View>
        <View className='oneCS-header-right' style={{ backgroundColor: themeC[`color-brand-${globalTheme}`] }}>
          {
            scoreData.courseItem.commented ?
              scoreData.courseItem.courseScore :
              '未评教'
          }
        </View>
      </View>

      <View className='oneCS-content'>
        <View className='oneCS-content-3tag'>
          <AtSegmentedControl
            onClick={e => setSelectedTag(e)}
            selectedColor={themeC[`color-brand-${globalTheme}`]}
            fontSize='30'
            current={selectedTag}
            values={['本专业', '教学班', '全课程']}
          />
          <View className='oneCS-content-3tag-bottom'>
            <View className='oneCS-content-3tag-bottom-box'>
              <IconFont name='bussiness-man' size={48} color={themeC['color-grey']} />
              <View className='oneCS-content-3tag-bottom-box-right'>
                <Text className='oneCS-title_small'>我的排名</Text>
                <Text className='oneCS-content-3tag-bottom-box-right-number'>
                  {
                    selectedTag === 0 && (scoreData.majorStatistic.rank + '/' + scoreData.majorStatistic.sum)
                  }
                  {
                    selectedTag === 1 && (scoreData.courseClassStatistic.rank + '/' + scoreData.courseClassStatistic.sum)
                  }
                  {
                    selectedTag === 2 && (scoreData.courseStatistic.rank + '/' + scoreData.courseStatistic.sum)
                  }
                </Text>
              </View>
            </View>

            <View className='oneCS-content-3tag-bottom-box'>
              <IconFont name='Customermanagement' size={48} color={themeC['color-grey']} />
              <View className='oneCS-content-3tag-bottom-box-right'>
                <Text className='oneCS-title_small'>专业平均</Text>
                <Text className='oneCS-content-3tag-bottom-box-right-number'>
                  {
                    selectedTag === 0 && scoreData.majorStatistic.avgScore.toFixed(2)
                  }
                  {
                    selectedTag === 1 && scoreData.courseClassStatistic.avgScore.toFixed(2)
                  }
                  {
                    selectedTag === 2 && scoreData.courseStatistic.avgScore.toFixed(2)
                  }
                </Text>
              </View>
            </View>

            <View className='oneCS-content-3tag-bottom-box'>
              <IconFont name='hot' size={48} color={themeC['color-grey']} />
              <View className='oneCS-content-3tag-bottom-box-right'>
                <Text className='oneCS-title_small'>专业最高</Text>
                <Text className='oneCS-content-3tag-bottom-box-right-number'>
                  {
                    selectedTag === 0 && scoreData.majorStatistic.maxScore
                  }
                  {
                    selectedTag === 1 && scoreData.courseClassStatistic.maxScore
                  }
                  {
                    selectedTag === 2 && scoreData.courseStatistic.maxScore
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className='oneCS-content-title'>
          <Text className='oneCS-title_small'>成绩明细</Text>
        </View>

      </View>

      <View className='oneCS-footer'>
        {
          scoreData &&
          <F2Canvas
            className='oneCS-footer-chart'
            onInit={chartOnInit}
          />
        }
      </View>

    </View>
  )


}

function mapStateToProps(state) {
  return {
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
  };
}

export default connect(mapStateToProps)(CardRanking);
