import React from 'react'
import { Button } from '@tarojs/components'

import './index.scss'

function CustomButton(props) {

  const { value, disabled, loading, onSubmit, openType, theme, backgroundColor } = props;
  const className = `custom-color-button courseBox-boxColor-${backgroundColor}_${theme} courseBox-fontColor-${backgroundColor}_${theme}`

  return (
    <Button
      className={className}
      disabled={disabled}
      loading={loading}
      openType={openType}
      onClick={onSubmit}
      onGetUserInfo={onSubmit}
    >
      {value}
    </Button>
  )

}

export default CustomButton
