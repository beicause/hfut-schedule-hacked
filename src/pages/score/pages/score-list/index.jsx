import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'

import ScoreDetailFL from '../../components/ScoreDetailFL'
import IconFont from '../../../../components/iconfont'
import * as actions from '../../../../actions/score'
import EmptyImg from '../../../../assets/img/empty.svg'
import themeC from '../../../../style/theme'
import formatScore from '../../utils/formatScore'
import './index.scss'


function ScoreDetail(props) {
  const { scorelist, termRanks, scoreDigits, globalTheme, showFuckedGrade, enterScorelist } = props
  const [scoreDetailFLData, setScoreDetailFLData] = useState({
    isOpened: false,
    info: null,
  })

  // 适配全局主题
  useDidShow(() => Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: themeC[`color-brand-dark-${globalTheme}`] }))

  useEffect(() => {
    enterScorelist({ force: true })
  }, [enterScorelist])

  // 没有成绩
  if (scorelist.length === 0) {
    return (
      <View className='scorelist'>
        <View className='scorelist-none'>
          <Image
            src={EmptyImg}
            className='scorelist-none-noneImg'
          />
          <Text className='scorelist-none-noneText'>没有查询到成绩~</Text>
          <View className='scorelist-none-ad'>

          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='scorelist'>

      <View className='scorelist-content'>
        <Swiper
          className='scorelist-swiper'
          indicatorColor='#dddddd'
          indicatorActiveColor='#999999'
          indicatorDots
          duration={350}
          current={scorelist.length - 1}
        >
          {
            scorelist.map((scoreData, index) => {
              let headerData = []
              if (termRanks.length === scorelist.length) {
                headerData = [
                  {
                    title: '我的排名',
                    content: `${termRanks[index].rank}/${termRanks[index].sum}`,
                  },
                  {
                    title: '我的成绩',
                    content: formatScore(termRanks[index].score, scoreDigits),
                  },
                  {
                    title: '专业平均',
                    content: formatScore(termRanks[index].avgScore, scoreDigits),
                  },
                  {
                    title: '专业最高',
                    content: formatScore(termRanks[index].maxScore, scoreDigits),
                  },
                ]
              }
              return (
                <SwiperItem className={`scorelist-swiper-item score-swiper-item_${index}`} key={index}>
                  <View className='scorelist-swiper-item-title'>{scoreData.semesterName}</View>

                  <View className='scorelist-header'>
                    {
                      headerData.map((data) => (
                        <View className='scorelist-header-box' key={data.title}>
                          <View className='scorelist-header-box-right'>
                            <Text className='scorelist-title_small'>{data.title}</Text>
                            <Text className='scorelist-header-box-right-number'>{data.content}</Text>
                          </View>
                        </View>
                      ))
                    }
                  </View>

                  <View className='scorelist-swiper-item-list'>
                    {
                      scoreData.scorelist.map(elemData => {
                        let decoColor = 'green'
                        if (parseFloat(elemData.gpa) === 0) {
                          decoColor = 'red'
                        } else if (parseFloat(elemData.gpa) < 2) {
                          decoColor = 'yellow'
                        }

                        if (!showFuckedGrade && decoColor === 'red') {
                          return
                        }

                        return (
                          <View className='scorelist-swiper-item-elem' key={elemData.lessonCode} onClick={() => setScoreDetailFLData({ isOpened: true, info: elemData })}>
                            <View className={`scorelist-swiper-item-elem-deco scorelist-swiper-item-elem-deco_${decoColor}`}></View>
                            <View className='scorelist-swiper-item-elem-left'>
                              <View className='scorelist-swiper-item-elem-left_title'>{elemData.lessonName.length <= 13 ? elemData.lessonName : (elemData.lessonName.slice(0, 12) + "...")}</View>
                              <View className='scorelist-swiper-item-elem-left_comment'>
                                {`学分:${elemData.credit}        绩点:${elemData.gpa}`}
                              </View>
                            </View>
                            <View className='scorelist-swiper-item-elem-right'>{elemData.grade === '--' ? '待评教' : elemData.grade}</View>
                          </View>
                        )
                      })
                    }
                  </View>
                </SwiperItem>
              )
            })
          }
        </Swiper>
        <View className='scorelist-content-shadow'></View>
      </View>

      <ScoreDetailFL scoreDetailFLData={scoreDetailFLData} onClose={() => setScoreDetailFLData({ ...scoreDetailFLData, isOpened: false })} />
    </View>
  )
}


function mapStateToProps(state) {
  return {
    scorelist: state.score.bizData.scorelist,
    termRanks: state.score.bizData.termRanks,
    globalTheme: state.schedule.bizData.userConfig.globalTheme,
    scoreDigits: state.schedule.bizData.userConfig.scoreDigits,
    showFuckedGrade: state.schedule.bizData.userConfig.showFuckedGrade,
  };
}

export default connect(mapStateToProps, actions)(ScoreDetail);
