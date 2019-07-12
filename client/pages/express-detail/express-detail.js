// express-detail.js
// 快递详情页，显示快递的起始地址、感谢费、收件人、快递号、重量大小和备注

const app = getApp();
const express_api = require('../../api/express.js');

Page({

  data: {
    exp: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },

  onLoad: function (options) {
    var that = this;
    // 获取快递的详细信息
    express_api.getExpByID(options.id).then(exp => {
      if (exp[0].owner_id == app.globalData.user_id) {
        wx.redirectTo({
          url: '../me/publish_detail/publish_detail?_id=' + options.id,
        })
      }
      that.setData({ exp: exp[0] });
    })
    .catch(err => {
      console.log(err);
      wx.showModal({
        title: '抱歉',
        content: '无法获取该快递',
        showCancel: false,
        success(res) {
          wx.navigateBack({
            delta: 1
          });
        }
      });
    });
  },

  // 取快递页面
  take_express: function () {
    wx.navigateTo({
      url: '../take/take?exp=' + JSON.stringify(this.data.exp),
    })
  }
})