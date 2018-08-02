// index.js
// 首页，展示发布的快递，以及添加快递按钮

const app = getApp()

Page({

  data: {
    expresses: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination
  },

  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.api + "/get_express",
      method: 'GET',
      header: {
        'Content-Type': 'application/json' // 返回json格式，必须要加
      }, // 设置请求的 header
      success: function (res) {
        console.log("res: ", res.data);
        that.setData({
          expresses: res.data // 将返回的数据放在expresses里
        });
        console.log("expresses:", that.data.expresses)
      }
    })
  },

  goToaddExpress: function () {
    wx.navigateTo({
      url: '../addexpress/addexpress'
    })
  },

  detail: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../express-detail/express-detail?id=' + e.currentTarget.id,
    })
  }
})