// myexpress.js

const app = getApp()

Page({

  data: {
    userInfo: {},
    express_publish: [],
    express_take: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination
  },

  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    var that = this
    var url = app.globalData.api + "/get_my_express";
    // 获取用户快递
    wx.request({
      url: url,
      data: {user_id: app.globalData.user_id},
      success: function (res) {
        console.log("res: ", res.data);
        that.setData({
          express_publish: res.data.express_publish,
          express_take: res.data.express_take,
        });
      }
    })
  },

  publish_detail: function (e) {
    wx.navigateTo({
      url: '../publish_detail/publish_detail?id=' + e.currentTarget.id,
    })
  },
  take_detail: function (e) {
    wx.navigateTo({
      url: '../take_detail/take_detail?id=' + e.currentTarget.id,
    })
  },
  edit_user: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  }
})