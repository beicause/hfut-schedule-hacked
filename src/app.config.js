import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    // 'pages/score/pages/score-list/index',

    'pages/event/index',
    'pages/schedule/index',
    'pages/score/index',
    'pages/home/index',
    'pages/login/index',

    'pages/schedule/pages/mooc/index',
    'pages/schedule/pages/history-schedule/index',
    'pages/schedule/pages/class-list/index',

    'pages/score/pages/score-list/index',
    'pages/score/pages/one-course-score/index',
    // 'pages/score/pages/pub-credit/index',
    // 'pages/score/pages/pub-fail-rate/index',
    // 'pages/score/pages/score-else-data/index',

    // 'pages/home/pages/gift/index',
    'pages/home/pages/empty-clazz-room/index',
    'pages/home/pages/empty-clazz-room/pages/room-detail-schedule/index',
    'pages/home/pages/course-search/index',
    'pages/home/pages/course-search/pages/single-course-schedule/index',
    'pages/home/pages/book-search/index',
    'pages/home/pages/exam-arrange/index',
    'pages/home/pages/teacher-evaluate/index',
    'pages/home/pages/donate/index',
    'pages/home/pages/feedback-update/index',
    'pages/home/pages/all-schedule/index',

  ],
  "subpackages": [
    {
      "root": "package-card",
      "pages": [
        "pages/card/index",
        "pages/card-ranking/index",
        "pages/card-custom/index",
      ]
    },
    {
      "root": "package-weather",
      "pages": [
        "pages/weather/index",
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '课表',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: '#fff',
    // borderStyle: 'white',
    custom: false,
    list: [{
      pagePath: 'pages/event/index',
      text: '日程',
      iconPath: 'assets/tab/event.png',
      selectedIconPath: 'assets/tab/event_active.png',
    },
    {
      pagePath: 'pages/schedule/index',
      text: '课表',
      iconPath: 'assets/tab/schedule.png',
      selectedIconPath: 'assets/tab/schedule_active.png',
    },
    {
      pagePath: 'pages/score/index',
      text: '成绩',
      iconPath: 'assets/tab/score.png',
      selectedIconPath: 'assets/tab/score_active.png',
    },
    {
      pagePath: 'pages/home/index',
      text: '我',
      iconPath: 'assets/tab/home.png',
      selectedIconPath: 'assets/tab/home_active.png',
    },
    ]
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于获取天气信息" 
    }
  },
  usingComponents: useGlobalIconFont(),
}
