// pages/me/take_detail/take_detail.js

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
      success: res => {
        that.setData({
          exp: res.data
        })
      }
    })
  },

  confirm: function () {
    var that = this
    wx.showModal({
      title: '确认收款吗',
      content: '请在发布快递的同学支付感谢金后确认收款',
      confirmColor: '#6c0022',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.api + '/express_confirm', // 修改快递状态
            method: 'GET',
            data: { id: that.data.exp.id },
            success: function () {
              wx.showModal({
                title: '已确认！',
                content: '该快递信息已被删除',
                showCancel: false,
                confirmColor: '#6c0022',
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})