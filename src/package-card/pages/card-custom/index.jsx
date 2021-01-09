import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'

import IconFont from '../../../components/iconfont'
import themeC from '../../../style/theme'
import { customCalculate } from '../../utils/calculate'
import { alias } from '../../assets/recordClass'
import './index.scss'


function CardCustom(props) {
  const { bizData, globalTheme } = props
  const { recordDataList, basicAnalyzedData } = bizData

  const [customedData, setCustomedData] = useState([])
  const [selectData, setSelectData] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    console.log('计算自定义消费')
    const consumeDataList = recordDataList.filter(function (a) {
      return a.type === '持卡人消费'
    })
    const aliasList = consumeDataList.map(recordData => ({
      ...recordData,
      place: alias[recordData.place] ? alias[recordData.place] : recordData.place
    }))
    setCustomedData(customCalculate(aliasList, basicAnalyzedData))
    setSelectData([1, 1, 1, 1, 0, 0, 0, 0])
  }, [basicAnalyzedData, recordDataList])

  // 数据获取完成，渲染账单内容

  return (
    <View className='cardCustom'>
      <View className='cardCustom-shadow'></View>

      <View className='cardCustom-header'>
        <IconFont name='food-cookie' size={56} />
        <IconFont name='food-avocado' size={56} />
        <IconFont name='food-pudding' size={56} />
        <IconFont name='food-strawberry' size={56} />
        <IconFont name='food-doughnut' size={56} />
        <IconFont name='food-bread' size={56} />
        <IconFont name='food-pizza' size={56} />
        <IconFont name='food-taco' size={56} />
      </View>

      <View className='cardCustom-content'>

        {/* {
          selectData[0] &&
          <View className='cardCustom-content-row'>
            <Text className='cardCustom-content-text1'>我的本学期日均消费为：</Text>
            <Text className='cardCustom-content-text2'>¥{customedData[0]}</Text>
          </View>
        } */}

        {
          selectData[1] &&
          <View className='cardCustom-content-row'>
            <Text className='cardCustom-content-text1'>我最喜欢的食堂是：</Text>
            <Text className='cardCustom-content-text2'>{customedData[1][0].place}</Text>
            <Text className='cardCustom-content-text1'>。以下是我最常去的食堂排名：</Text>
            <View className='cardCustom-content-ranking'>
              {customedData[1].map((data, index) => <View className='cardCustom-content-text3' key={index}>{index + 1}. {data.place}</View>)}
            </View>
          </View>
        }

        {
          selectData[2] &&
          <View className='cardCustom-content-row'>
            <View>
              <Text className='cardCustom-content-text1'>我在食堂一共干了</Text>
              <Text className='cardCustom-content-text2'>{customedData[2].total.number}</Text>
              <Text className='cardCustom-content-text1'>顿饭。</Text>
              <Text className='cardCustom-content-text1'>每顿饭的平均花销为：</Text>
              <Text className='cardCustom-content-text2'>¥{customedData[2].total.money}</Text>
              <Text className='cardCustom-content-text1'>。</Text>
            </View>
            <View>
              <Text className='cardCustom-content-text2'>{customedData[2].breakfast.number}</Text>
              <Text className='cardCustom-content-text1'>顿早饭，每顿早饭的平均花销为：</Text>
              <Text className='cardCustom-content-text2'>¥{customedData[2].breakfast.money}</Text>
            </View>
            <View>
              <Text className='cardCustom-content-text2'>{customedData[2].lunch.number}</Text>
              <Text className='cardCustom-content-text1'>顿午饭，每顿午饭的平均花销为：</Text>
              <Text className='cardCustom-content-text2'>¥{customedData[2].lunch.money}</Text>
            </View>
            <View>
              <Text className='cardCustom-content-text2'>{customedData[2].dinner.number}</Text>
              <Text className='cardCustom-content-text1'>顿晚饭，每顿晚饭的平均花销为：</Text>
              <Text className='cardCustom-content-text2'>¥{customedData[2].dinner.money}</Text>
            </View>
          </View>
        }

        {
          selectData[3] &&
          <View className='cardCustom-content-row'>
            <View>
              <Text className='cardCustom-content-text1'>我的平均早饭时间是：</Text>
              <Text className='cardCustom-content-text2'>{customedData[3].breakfast}</Text>
            </View>
            <View>
              <Text className='cardCustom-content-text1'>我的平均午饭时间是：</Text>
              <Text className='cardCustom-content-text2'>{customedData[3].lunch}</Text>
            </View>
            <View>
              <Text className='cardCustom-content-text1'>我的平均晚饭时间是：</Text>
              <Text className='cardCustom-content-text2'>{customedData[3].dinner}</Text>
            </View>
          </View>
        }

        <View className='cardCustom-content-row'>
          <Text className='cardCustom-content-text1'>干饭人，寒假期间和下个学期也要加油干饭哦～</Text>
        </View>

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

export default connect(mapStateToProps)(CardCustom);
