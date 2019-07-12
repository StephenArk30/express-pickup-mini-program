// take_detail.js
// 代拿的快递详情

const app = getApp();
const express_api = require('../../../api/express.js');

Page({
  
  data: {
    exp: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },

  onLoad: function (options) {
    let that = this;
    express_api.getExpByID(options.id)
      .then(exp => {
        exp = exp[0];
        that.setData({
          exp
        });
      })
      .catch(err => {
        console.log(err);
        wx.showToast({
          title: '无法获取该快递，请稍后重试',
          icon: 'none',
          duration: 0,
          mask: true,
          complete: function (res) {
            wx.navigateBack({
              delta: 1
            });
          },
        });
      });
  },

  confirm: function () {
    var that = this
    wx.showModal({
      title: '确认收款吗',
      content: '请在发布快递的同学支付感谢金后确认收款',
      confirmColor: '#6c0022',
      success: function (res) {
        if (res.confirm) {
          express_api.deleteExp(that.data.exp._id)
            .then(res => {
              wx.showModal({
                title: '已确认！',
                content: '该快递信息已被删除',
                showCancel: false,
                confirmColor: '#6c0022',
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }
              });
            })
            .catch(err => {
              console.log(err);
              wx.showToast({
                title: '确认失败，请稍后重试',
                icon: 'none',
                duration: 0,
                mask: true,
                complete: function (res) {
                  wx.navigateBack({
                    delta: 1
                  });
                },
              });
            });
        }
      }
    });
  }
})