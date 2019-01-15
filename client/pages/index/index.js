// index.js
// 首页，展示发布的快递，以及添加快递按钮

const app = getApp()

Page({

  data: {
    expresses: [], // 存放快递
    express_station: app.globalData.express_station,
    destination: app.globalData.destination
  },

  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.api + "/get_express",
      method: 'GET',
      // 设置请求的 header
      header: {
        'Content-Type': 'application/json' // 返回json格式，必须要加
      },
      success: function (res) {
        // console.log("res: ", res.data);
        that.setData({
          expresses: res.data // 将返回的数据放在expresses里
        });
        // console.log("expresses:", that.data.expresses)
      }
    })
  },

  goToaddExpress: function () {
    wx.navigateTo({
      url: '../addexpress/addexpress' // 添加快递
    })
  },

  detail: function (e) {
    // console.log(e.currentTarget.id)
    // 查看快递
    wx.navigateTo({
      url: '../express-detail/express-detail?id=' + e.currentTarget.id,
    })
  }
})