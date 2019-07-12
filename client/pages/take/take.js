// take.js
// 代拿页

const app = getApp();
const util = require('../../utils/util.js');
const express_api = require('../../api/express.js');
const user_api = require('../../api/user.js');

Page({

  data: {
    exp: {},
    user: {},
    express_station: app.globalData.express_station,
    destination: app.globalData.destination,
  },


  onLoad: function (options) {
    // 时间设为打开页面的时间
    this.setData({
      time: util.formatTimehm(new Date)
    });
    this.setData({
      exp: JSON.parse(options.exp),
    });
    let that = this;
    user_api.getUserByID(app.globalData.user_id)
    .then(user => {
      that.setData({
        user: res.data,
      });
    })
    .catch(err => {});
  },

  // 选择时间
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    });
  },

  // 确认代拿
  done: function (e) {
    // 检查输入合法性
    if (e.detail.value.tele == '' && 
    e.detail.value.wechat == '' && e.detail.value.qq == '') {
      wx.showToast({
        title: '请填写至少一种联系方式！',
        icon: 'none'
      });
      return;
    }

    let that = this;
    let take_data = {};
    take_data.taker_id = app.globalData.user_id;
    take_data.tele = e.detail.value.tele;
    take_data.wechat = e.detail.value.wechat;
    take_data.qq = e.detail.value.qq;
    take_data.time_handover = e.detail.value.time_ho;
    take_data.state = 1;
    express_api.takeExp(this.data.exp._id, take_data)
    .then(res => {
      let taker = {
        taker_id: app.globalData.user_id,
        tele: e.detail.value.tele,
        wechat: e.detail.value.wechat,
        qq: e.detail.value.qq
      }
      wx.navigateBack({
        delta: 1
      })
      // 先后退一层再重定向是为了不让页面回到此页
      let exp = { ...that.data.exp, ...take_data };
      wx.redirectTo({
        url: '../take_confirmed/take_confirmed?exp=' + JSON.stringify(exp),
      });
    })
    .catch(err => {
      console.log(err);
      wx.showModal({
        title: '抱歉，出错了',
        content: '无法代拿，请稍后重试',
        icon: 'none',
        success: function (res) {
          wx.navigateBack({
            delta: 1
          });
        }
      });
    });
  }
})