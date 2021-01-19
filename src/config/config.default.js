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
  version: '4.9.5',

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
      info: '祝大家寒假愉快哦～🌈🌈🌈',
    },
    {
      info: '寒假期间小课表会努力实现更多的功能，希望同学们能更加喜欢！',
    },
    {
      info: ' ',
    },
    {
      info: '呐，我们想在这里向全校同学发出邀请，想要和更多的同学一起去做这个炫酷的东东😉',
    },
    {
      info: '如果你有兴趣，快进群了解一下吧！',
    },
    {
      info: '另外，有任何问题或想要反馈意见也欢迎进群和我们聊聊～',
    },
    {
      info: '小课表在这里等候大家⬇',
    },
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
    // {
    //   info: '修复全校课表',
    //   // comment: '很多人都被提示',
    // },
    // {
    //   info: '修复全校课表',
    //   // comment: '很多人都被提示',
    // },
    // {
    //   info: '修复全校课表相关问题',
    //   // comment: '很多人都被提示',
    // },
  ],
  btn: {
    show: true,
    text: '点我复制QQ群号',
  }
}

