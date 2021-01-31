import TerserPlugin from "terser-webpack-plugin";

/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  terser: {
    enable: false,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  mini: {
    prerender: {
      match: 'pages/schedule/**', // 所有以 `pages/shop/` 开头的页面都参与 prerender
      include: [
        'pages/event/index',
        'pages/score/index',
        'pages/home/index',
        
        'pages/home/pages/empty-clazz-room/index',
        // 'pages/home/pages/empty-clazz-room/pages/room-detail-schedule/index',
        // 'pages/home/pages/course-search/pages/single-course-schedule/index',
        'pages/home/pages/all-schedule/index',
        'pages/home/pages/donate/index',
        // 'pages/home/pages/feedback-update/index',
      ], // `pages/any/way/index` 也会参与 prerender
      console: true,
      // exclude: ['pages/shop/index/index'] // `pages/shop/index/index` 不用参与 prerender
    },
    webpackChain(chain) {
      chain.mode("production");
      chain.optimization.minimize(true);
      chain.plugin("terser").use(TerserPlugin, [
        {
          cache: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false
            }
          }
        }
      ]);
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
