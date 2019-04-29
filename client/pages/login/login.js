//login.js
// 登录

//获取应用实例
const app = getApp()
const test = require("../../api/express");

Page({
  data: {
    motto: '大学生快递代拿',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    test.db_get().then(res => {
      console.log(res);
    }).catch(err => {}); // 查
    test.download_file();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  goToPublish: function () {
    // 判断用户是否注册
    if (app.globalData.user_id > -1) {
      wx.switchTab({
        url: '../index/index',
      })
    }
    // 否则前往注册
    else {
      wx.navigateTo({
        url: '../register/register',
      })
    }
  },
  
  // 获取用户信息
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  choosePhoto: function () {
    // 微信选择图片的接口
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        test.upload_file(res.tempFilePaths[0]);
      },
    })
  },
})
