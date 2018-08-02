// express-detail.js
// 快递详情页，显示快递的起始地址、感谢费、收件人、快递号、重量大小和备注

const app = getApp()

Page({

  data: {
    exp: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var that = this
    wx.request({
      url: app.globalData.api + '/get_express_d',
      data: { id: options.id },
      success: res=> {
        if (app.globalData.user_id == res.data.owner_id) {
          wx.redirectTo({
            url: '../me/publish_detail/publish_detail?id=' + res.data.id,
          })
        }
        else that.setData({
          exp: res.data
        })
      }
    })
  },

  take_express: function () {
    wx.navigateTo({
      url: '../take/take?exp=' + JSON.stringify(this.data.exp),
    })
  }
})