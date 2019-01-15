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
      id: options.id // 从主页传递来的快递id
    })
    var that = this
    // 获取快递的详细信息
    wx.request({
      url: app.globalData.api + '/get_express_d',
      data: { id: options.id },
      success: res=> {
        // 如果是自己发布的则跳转至发布详情页
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

  // 取快递页面
  take_express: function () {
    wx.navigateTo({
      url: '../take/take?exp=' + JSON.stringify(this.data.exp),
    })
  }
})