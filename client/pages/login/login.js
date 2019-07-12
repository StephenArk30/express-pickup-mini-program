//login.js
// 登录

//获取应用实例
const app = getApp();
const user_api = require('../../api/user.js');

Page({
  data: {
    motto: '大学生快递代拿',
    user_id: -1
  },
  onLoad: function () {
    this.getUserInfo();
  },
  goToIndex: function () {
    // 判断用户是否注册
    if (this.user_id != -1) {
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
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenID',
      complete: res => {
        let openid = res.result.openid;
        user_api.getUserByOpenID(openid)
        .then(user => {
          // console.log(openid, user);
          this.setData({
            user_id: user[0]._id
          });
          app.globalData.user_id = user[0]._id;
        })
        .catch(err => {
          console.log(err);
        })
      }
    });
  }
});
