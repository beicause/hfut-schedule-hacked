import React from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import './style/taro-ui-custom.scss'
import './style/app.scss'

const store = configStore()

export default (props) => {

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
