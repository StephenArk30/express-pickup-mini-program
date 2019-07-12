// userinfo.js
// 用户信息

const app = getApp();
const user_api = require("../../../api/user.js");

Page({

  data: {
    userInfo: {},
    name: '',
    tele: '',
    card_id: '',
    wechat: '',
    qq: '',
    school: ['深圳大学'],
    i: 0,
    express_station: app.globalData.express_station,
    j: 0,
    destination: app.globalData.destination,
    k: 0,
  },

  onLoad: function (options) {
    let that = this;
    user_api.getUserByID(app.globalData.user_id)
    .then(user => {
      console.log(user);
      let userInfo = user[0];
      that.setData({ userInfo, card_id: userInfo.card_id });
      if (userInfo.name) that.setData({ name: userInfo.name });
      if (userInfo.school) that.setData({ index: userInfo.school });
      if (userInfo.tele) that.setData({ tele: userInfo.tele });
      if (userInfo.wechat) that.setData({ wechat: userInfo.wechat });
      if (userInfo.qq) that.setData({ qq: userInfo.qq });
      if (userInfo.station) that.setData({ j: userInfo.station });
      if (userInfo.destination) that.setData({ k: userInfo.destination });
    })
    .catch(err => {});
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let userInfo = e.detail.value;
    userInfo._id = this.data.userInfo._id;
    user_api.editUser(userInfo._id, userInfo)
    .then(res => {
      that.setData({ userInfo });
      wx.showToast({
        title: '修改成功！',
        icon: 'none'
      });
    })
    .catch(err => {
      wx.showToast({
        title: '修改失败，请重试',
        icon: 'none'
      });
    });
  },

  school_Change: function (e) {
    console.log('学校发送选择改变，携带值为', e.detail.value)
    this.setData({
      i: e.detail.value
    })
  },
  e_s_Change: function (e) {
    console.log('快递站发送选择改变，携带值为', e.detail.value)
    this.setData({
      j: e.detail.value
    })
  },
  dest_Change: function (e) {
    console.log('目的地发送选择改变，携带值为', e.detail.value)
    this.setData({
      k: e.detail.value
    })
  },
})