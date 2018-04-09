import { ARTICLES_TAG } from '../../utils/keys.js';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    hasMore: false,
    currentIndex: 1,
    tagLabel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tagLabel: options.tagLabel
    });
    this.loadMore(1, options.tagLabel, false);
  },
  onPullDownRefresh() {
    this.loadMore(1, this.data.tagLabel, true);
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.loadMore(++this.data.currentIndex);
    }
  },
  loadMore(index, tagLabel, isRefresh) {
    app.blog.getArticles(index, 11, tagLabel).then(result => {
      //页面显示赋值
      let _arr = [];
      !isRefresh && (_arr = this.data.list);
      _arr = [..._arr, ...result.list];
      this.setData({
        hasMore: _arr.length < result.totalCount,
        currentIndex: index,
        list: _arr
      }, () => {
        console.log(this.data);
      });

      //页面显示列表值存储
      this.storeList(_arr);
    })
  },

  storeList(arr) {
    app.wechat.setStorage(ARTICLES_TAG, arr).then(() => {
      console.log('articles_tag are  saved ');
    })
  }

})