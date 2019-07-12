// publish_detail.js
// 发布的快递的详情，可删除或修改

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
    express_api.getExpByID(options._id)
    .then(exp => {
      exp = exp[0];
      that.setData({
        exp
      });
    })
    .catch(err => {
      console.log(err);
      wx.showModal({
        title: '抱歉',
        content: '无法获取该快递，请稍后重试',
        success: function (res) {
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
      title: '确认收货吗',
      content: '确认后，请联系代拿同学并支付注明的感谢金，提醒代拿同学确认收款',
      confirmColor: '#6c0022',
      success: function (res) {
        if (res.confirm) {
          express_api.editExpStatus(that.data.exp._id, 2)
          .then(res => {
            let exp = that.data.exp;
            exp.state = 2;
            that.setData({ exp });
          })
          .catch(err=> {
            console.log(err);
            wx.showToast({
              title: '确认失败，请稍后重试',
              icon: 'none',
              duration: 0,
              mask: true,
              complete: function(res) {
                wx.navigateBack({
                  delta: 1
                });
              },
            });
          });
        }
      }
    });
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
          express_api.deleteExp(that.data.exp._id)
          .then(res => {
            wx.showModal({
              title: '已删除！',
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
              title: '删除失败，请稍后重试',
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