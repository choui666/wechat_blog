import { countArrLength, formatterList } from '../../utils/util.js';
import { ARTICLES } from '../../utils/keys.js';
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasMore: false,
    currentIndex: 1,
    groups: []
  },

  onLoad() {
    this.loadMore(1);
  },

  onPullDownRefresh() {
    this.loadMore(1, true);
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.loadMore(this.data.currentIndex++);
    }
  },

  loadMore(index, isRefresh) {
    app.blog.getArticles(index, 6).then(result => {
      //页面显示赋值
      let _arr = [];
      !isRefresh && this.data.groups.forEach(item => {
        _arr = _arr.concat(item.group);
      })
      _arr = _arr.concat(result.list);
      const _groups = formatterList(_arr);
      this.setData({
        hasMore: _arr.length < result.totalCount,
        currentIndex: index,
        groups: _groups
      }, () => {
        console.log(this.data);
      });

      //页面显示列表值存储
      this.storeList(_groups);
    })
  },

  storeList(arr) {
    let _arr = [];
    arr.forEach(item => {
      _arr = [..._arr, ...item.group];
    });
    app.wechat.setStorage(ARTICLES, _arr).then(() => {
      console.log('articles are  saved ');
    })
  }

})
