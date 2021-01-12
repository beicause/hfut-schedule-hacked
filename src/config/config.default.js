import semesterData from '../assets/data/semesterData'

// 0：无需进行操作
// 1：需要重新登陆
export const updateState = 0

// 是否需要更新全校课表的selectInfo
export const updateAllSchedule = true

// 当前学期
export const currentSemester = {
  ...semesterData[1],
  weekNumber: 20,
}

export const config = {
  version: '4.9.3',

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
  }
}

export const updateInfo = {
  notices: [
    {
      info: '我们刚刚修复了一个小bug，涉及到极少数同学的账单数据完整性。已经查询成功账单的同学如果感觉自己的数据比较扭曲，可以考虑将账单重新生成一下。',
    },
    // {
    //   info: '是因为校园卡平台已经被同学们查爆了',
    // },
    // {
    //   info: '小课表已经尽力了，但我们对学校的🥔服务器无能为力',
    // },
    // {
    //   info: '我们呼吁大家这两天先不要太着急查询账单，或是在人少的时间段查',
    // },
    // {
    //   info: '若有不便，希望同学们理解！',
    // },
  ],
  features: [
    // {
    //   info: '全校课表新增下半学期的课',
    //   comment: '可以看到各专业最新的选课结果啦，之后还会更新数据～',
    // },
    // {
    //   info: '2. 新增开发者模式',
    //   comment: '解锁一些特别的小功能',
    // },
  ],
  bugs: [
    {
      info: '修复优化校园卡年度账单',
      // comment: '很多人都被提示',
    },
    {
      info: '修复全校课表',
      // comment: '很多人都被提示',
    },
    // {
    //   info: '修复全校课表相关问题',
    //   // comment: '很多人都被提示',
    // },
  ]
}

export const helpInfo = [
  {
    info: '1. 课表显示不出来/更新失败怎么办？',
    comment: '先多次下拉刷新试试。如果不行，请尝试以下操作：①退出小程序后台并重新进入；②退出登录并重新绑定，并确认自己的校区选择正确。如果进行了上述操作依旧无法正常显示，请反馈或联系客服',
  },
  {
    info: '2. 我的课表好像不准？',
    comment: '本小程序的数据与PC端教务实时同步（封网时也是），请先登录PC端教务查看自己课程是否一致，如有不一致请请反馈或联系客服',
  },
  {
    info: '3. 更换课程配色主题、解绑情侣等选项在哪里？',
    comment: '课表页-右上角加号-课表设置',
  },
]
