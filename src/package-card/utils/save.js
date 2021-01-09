import Taro from '@tarojs/taro'

import { config } from '../../utils/request'
import { types } from '../assets/recordClass'


export default (username, password, recordDataList) => {

  // 先压缩一下体积
  let recordDataList_ = recordDataList.map(data => ({
    ...data,
    type: types[data.type]
  }))


  Taro.request({
    url: config.baseUrl + '/card/save',
    data: {
      username,
      password,
      recordDataList: JSON.stringify(recordDataList_)
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}
