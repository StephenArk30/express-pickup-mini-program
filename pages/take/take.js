// pages/platform/take/take.js

const app = getApp()
var util = require('../../utils/util.js')

Page({

  data: {
    exp: {},
    user: {},
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },


  onLoad: function (options) {
    this.setData({
      time: util.formatTimehm(new Date)
    })
    this.setData({
      exp: JSON.parse(options.exp),
    })
    var that = this
    wx.request({
      url: app.globalData.api + '/get_user',
      data: { 'user_id': app.globalData.user_id },
      success(res) {
        that.setData({
          user: res.data,
        })
      }
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  done: function (e) {
    var that = this
    if (e.detail.value.tele == '' && 
    e.detail.value.wechat == '' && e.detail.value.qq == '') {
      wx.showToast({
        title: '请填写至少一种联系方式！',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: app.globalData.api + '/take_express',
      method: 'POST',
      data: {
        taker_id: app.globalData.user_id,
        id: that.data.exp.id,
        tele: e.detail.value.tele,
        wechat: e.detail.value.wechat,
        qq: e.detail.value.qq,
        time_handover: e.detail.value.time_ho,
      },
      success () {
        var taker = {
          taker_id: app.globalData.user_id,
          tele: e.detail.value.tele,
          wechat: e.detail.value.wechat,
          qq: e.detail.value.qq
        }
        var express = {
          exp: that.data.exp,
          taker: taker,
          time: e.detail.value.time_ho
        }
        wx.navigateBack({
          delta: 1
        })
        wx.redirectTo({
          url: '../take_confirmed/take_confirmed?exp=' + JSON.stringify(express),
        })
      },
    })
  }
})