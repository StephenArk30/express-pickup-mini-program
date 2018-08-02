// pages/me/myexpress_detail/myexpress_detail.js

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
      title: '确认收货吗',
      content: '确认后，请联系代拿同学并支付注明的感谢金，提醒代拿同学确认收款',
      confirmColor: '#6c0022',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.api + '/express_confirm', // 修改快递状态
            method: 'GET',
            data: { id: that.data.id },
            success: function () {
              var _exp = that.data.exp
              _exp.state = 2
              that.setData({ exp: _exp })
            }
          })
        }
      }
    })
  },
  
  edit_exp: function () {
    var that = this
    wx.redirectTo({
      url: '../edit_exp/edit_exp?exp=' + JSON.stringify(that.data.exp),
    })
  },
  del_exp: function () {
    var that = this
    wx.showModal({
      title: '删除快递',
      content: '确认删除该快递吗？',
      confirmColor: '#6c0022',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.api + '/express_del', // 修改快递状态
            method: 'GET',
            data: { id: that.data.exp.id },
            success: function () {
              wx.showModal({
                title: '已删除！',
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