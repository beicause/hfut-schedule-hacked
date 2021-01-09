Component({
  properties: {
    // food-cookie | food-avocado | food-pudding | food-strawberry | food-doughnut | food-bread | food-pizza | food-taco | creditcard | round_like_fill | round_rank_fill | qupiao | bofangjilu | huatifuhao | shuju | biaoqian | biaoqian-copy-copy2 | biaoqian-copy | biaoqian-copy-copy | dayu | san | dizhi | lishi | dianzan | help | task-filling | map-filling | rili | sousuo | taolunqu | tishi | daibanshixiang | gongpai | jixiaopinggu | network | dingwei | moreandroid | anquan | bulletin | arrow-up-filling | arrow-down-filling | shibai | ceshi | tanhao | file-text | paihangbang | shezhi | swap | caidan | mingxinghuodong | wenjuan | aixin | aixin-filled | eye | info-circle-fill | plus | eye-close | search | arrow-right | arrow-lift | arrow-down | personal | calendar | gift
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      value: '',
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * swan.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    quot: '"',
    svgSize: 18 / 750 * swan.getSystemInfoSync().windowWidth,
    isStr: true,
  },
});
