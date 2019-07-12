// myexpress.js

const app = getApp();
const express_api = require("../../../api/express.js");

Page({

  data: {
    express_publish: [],
    express_take: [],
    express_station: app.globalData.express_station,
    destination: app.globalData.destination
  },

  onShow: function () {
    let that = this;
    express_api.getExpByOwnerID(app.globalData.user_id)
      .then(express_publish => that.setData({ express_publish }))
      .catch(err => {});
    express_api.getExpByTakerID(app.globalData.user_id)
      .then(express_take => that.setData({ express_take }))
      .catch(err => {});
  },

  publish_detail: function (e) {
    wx.navigateTo({
      url: '../publish_detail/publish_detail?id=' + e.currentTarget.id,
    })
  },
  take_detail: function (e) {
    wx.navigateTo({
      url: '../take_detail/take_detail?id=' + e.currentTarget.id,
    })
  },
  edit_user: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  }
})