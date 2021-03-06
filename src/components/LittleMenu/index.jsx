import React from 'react'
import { View } from '@tarojs/components'

import IconFont from '../iconfont'
import './index.scss'

export default (props) => {
  const { showMenu, menuList } = props

  if (!showMenu) {
    return ''
  }

  // console.log('妥')

  return (
    <View className='littleMenu-menu'>
      {
        menuList.map((item) =>
          <View
            key={item}
            className='littleMenu-menu-item'
            onClick={item.onClick}
          >
            <IconFont name={item.icon} size={34} />
            <View className='littleMenu-menu-item-text'>{item.value}</View>
          </View>
        )
      }
    </View>
  )


}