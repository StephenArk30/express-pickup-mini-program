// pages/platform/take/take.js

const app = getApp()

Page({

  data: {
    exp: {},
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      exp: JSON.parse(options.exp),
    })
  },
})