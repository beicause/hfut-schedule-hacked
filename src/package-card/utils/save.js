import Taro from '@tarojs/taro'

import { config } from '../../utils/request'
import { types } from '../assets/recordClass'


export default async (username, password, recordDataList) => {

  // 先压缩一下体积
  let recordDataList_ = recordDataList.map(data => ({
    ...data,
    type: types[data.type]
  }))

  const tryRequest = async () => {
    return Taro.request({
      url: config.baseUrl + '/card/save',
      // url: 'http://127.0.0.1:3003/card/save',
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

  // 尝试5次
  // 阿里云函数计算的锅。post请求容易崩
  for (let t = 0; t < 5; t++) {
    const res = await tryRequest()
    if (res.statusCode === 200) {
      break
    }
  }

}
