
//获取应用实例
const app = getApp()

// pages/tags.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.blog.getTags().then(result => {
      this.setData({
        tags: result
      })
    })
  }
})