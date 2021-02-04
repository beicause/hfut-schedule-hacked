import semesterData from '../assets/data/semesterData'

// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

// 是否需要更新全校课表的selectInfo
export const updateAllSchedule = false

// 当前学期
export const currentSemester = {
  ...semesterData[1],
  weekNumber: 25,
  endDate: '2021-02-28',
}

export const config = {
  version: '5.0.1',

  // 自动配置设置
  autoConfig: {
    showDiffHelp: true,
    showAllSHelp: true,
    showHomeRedPoint: true,  // 显示home页面新功能的红点
    fineModel: false,
  },

  // 用户设置
  userConfig: {
    // schedule的
    showAiXin: true,
    theme: 0,
    imgOpacity: 0.9,
    courseOpacity: 0.88,
    showRedPoint: true, // 课表上有备忘录的课程右上角的红点
    showAd: true,

    // event的
    eventBoxHeight: 1.5, // 1倍高度或1.5倍高度
    showBoxMask: true,
    showEventMemo: true, // event上显示memo
    exactWeather: true,

    // home的
    showDonate: true,

    // 全局的
    globalTheme: 8,

    // 开发者选项
    showFuckedGrade: true,

    // 成绩的
    hasPub: false,
    rankType: 'Avg',
    scoreDigits: 2,
  }
}

export const updateInfo = {
  notices: [
    {
      info: '大家普遍对成绩排名存在疑惑，我们刚刚在成绩页面中加入了帮助模块，有疑问的同学可以前去查看。',
    },
    // {
    //   info: '',
    // },
    {
      info: '如遇帮助中无法解决的问题，再进行反馈或联系客服。谢谢大家🙏',
    },
  ],
  features: [
    // {
    //   info: '全新“成绩”页面，成绩排名、数据分析',
    //   comment: [
    //     '前端开发：我',
    //     '后端开发：徐浩博（主）、我（辅）',
    //   ],
    // },
    // // {
    // //   info: '',
    // //   comment: '',
    // // },
  ],
  bugs: [
    {
      info: '修复成绩趋势图从“大一下”开始显示',
      // comment: '很多人都被提示',
    },
    {
      info: '优化成绩算法，提高准确性',
      // comment: '很多人都被提示',
    },
    // {
    //   info: '修复全校课表相关问题',
    //   // comment: '很多人都被提示',
    // },
  ],
  btn: {
    show: false,
    text: '点我复制QQ群号',
  }
}

