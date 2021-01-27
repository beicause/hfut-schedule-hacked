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
  version: '4.9.6',

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
      info: '这是课表诞生以来最复杂也是最强大的功能。寒假以来，我们就没有休息过、一直在努力加班，希望同学能更早的使用上。',
    },
    {
      info: '这期间有很多同学对我们的鼓励，这是给予我们最大的支持。但同时也希望个别同学停止对我们的催促和抱怨，耐心等待',
    },
    {
      info: '望互相理解🙏',
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
    show: false,
    text: '点我复制QQ群号',
  }
}

