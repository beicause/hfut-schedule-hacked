import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@tarojs/components'

import themeC from '../../style/theme'


function CustomButton(props) {

  const { value, isFixed, type = 'default', disabled, loading, onSubmit, openType } = props;
  const className = `${isFixed ? `fixed-circle-button fixed-circle-button_${type}`
    : `relative-circle-button relative-circle-button_${type}`}`

  const globalTheme = useSelector(state => state.schedule.bizData.userConfig.globalTheme)

  // 根据主题上色
  const style = {}
  switch (type) {
    case 'call':
      style.backgroundColor = themeC[`color-brand-dark-${globalTheme}`]
      break;
    case 'default':
      style.color = themeC[`color-brand-${globalTheme}`]
      break;

    default:
      break;
  }

  return (
    <Button
      className={className}
      disabled={disabled}
      loading={loading}
      openType={openType}
      onClick={onSubmit}
      onGetUserInfo={onSubmit}
      style={style}
    >
      {value}
    </Button>
  )

}

export default CustomButton
