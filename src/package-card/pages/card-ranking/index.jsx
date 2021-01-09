import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Picker } from '@tarojs/components'
import { AtProgress } from 'taro-ui'

import IconFont from '../../../components/iconfont'
import themeC from '../../../style/theme'
import { rankingCalculate, rankingIDDic, sortTypeDic } from '../../utils/calculate'
import { alias } from '../../assets/recordClass'
import './index.scss'


function CardRanking(props) {
  const { bizData, globalTheme } = props
  const { recordDataList } = bizData

  const [rankedData, setRankedData] = useState([])
  const [selectData, setSelectData] = useState({
    rankingID: 4,
    sortType: 0,
  })

  useEffect(() => {
    console.log('计算排名')
    console.log({ ...selectData })
    const consumeDataList = recordDataList.filter(function (a) {
      return a.type === '持卡人消费'
    })
    const aliasList = consumeDataList.map(recordData => ({
      ...recordData,
      place: alias[recordData.place] ? alias[recordData.place] : recordData.place
    }))
    setRankedData(rankingCalculate(aliasList, selectData.rankingID, selectData.sortType))
  }, [selectData, recordDataList])

  // 数据获取完成，渲染账单内容

  return (
    <View className='cardRanking'>
      <View className='cardRanking-shadow'></View>

      <View className='cardRanking-header'>
        <View className='cardRanking-header-btnbox'>

          <Picker className='cardRanking-header-btnbox-picker' mode='selector' range={rankingIDDic} value={selectData.rankingID} rangeKey='name'
            onChange={e => setSelectData({ ...selectData, rankingID: parseInt(e.detail.value) })}
          >
            <View className='cardRanking-header-btnbox-btn'>
              <Text className='cardRanking-header-btnbox-btn-text'>{rankingIDDic[selectData.rankingID].name}</Text>
              <IconFont name='arrow-down' size={36} color={themeC[`color-brand-dark-${globalTheme}`]} />
            </View>
          </Picker>

          <Picker className='cardRanking-header-btnbox-picker' mode='selector' range={sortTypeDic} value={selectData.sortType} rangeKey='name'
            onChange={e => setSelectData({ ...selectData, sortType: parseInt(e.detail.value) })}
          >
            <View className='cardRanking-header-btnbox-btn'>
              <Text className='cardRanking-header-btnbox-btn-text'>{sortTypeDic[selectData.sortType].name}</Text>
              <IconFont name='arrow-down' size={36} color={themeC[`color-brand-dark-${globalTheme}`]} />
            </View>
          </Picker>

        </View>
      </View>

      <View className='cardRanking-content'>
        {
          rankedData.map((data, index) => (
            <View className='cardRanking-content-row' key={data.index}>
              <View className='cardRanking-content-row-left'>
                {index + 1}
              </View>
              <View className='cardRanking-content-row-right'>
                <View className='cardRanking-content-row-top'>
                  <View>
                    <Text className='cardRanking-content-row-text1'>{data.place}</Text>
                    {
                      data.rate && <Text className='cardRanking-content-row-text2'> {data.rate}%</Text>
                    }
                  </View>
                  <View>
                    <Text className='cardRanking-content-row-text1'>¥{data.money}</Text>
                  </View>
                </View>
                <View className={`cardRanking-content-row-bottom cardRanking-content-row-bottom_${data.rate && 'pro'}`}>
                  {
                    data.rate ?
                      <AtProgress percent={data.rate * 1} color={themeC[`color-brand-${globalTheme}`]} isHidePercent />
                      :
                      <Text className='cardRanking-content-row-text2'>{data.time}</Text>
                  }
                </View>
              </View>
            </View>
          ))
        }
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

export default connect(mapStateToProps)(CardRanking);
