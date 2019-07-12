// index.js
// 首页，展示发布的快递，以及添加快递按钮

const app = getApp();
const express_api = require('../../api/express.js');

Page({

  data: {
    expresses: [], // 存放快递
    express_station: app.globalData.express_station,
    destination: app.globalData.destination
  },

  onShow: function () {
    let that = this;
    express_api.getAllExp().then(expresses => that.setData({ expresses }));
  },

  goToaddExpress: function () {
    wx.navigateTo({
      url: '../addexpress/addexpress' // 添加快递
    })
  },

  detail: function (e) {
    // console.log(e)
    // 查看快递
    wx.navigateTo({
      url: '../express-detail/express-detail?id=' + e.currentTarget.id,
    })
  }
})