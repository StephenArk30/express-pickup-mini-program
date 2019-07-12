// register.js
// 注册

const app = getApp()
const user_api = require('../../api/user.js');

Page({

  data: {
    // 选取学校的数据
    array: ['深圳大学'],
    objectArray: [
      {
        id: 0,
        name: '深圳大学'
      },
    ],
    index: 0,
  },
  
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
    var school = e.detail.value.school;
    var card_id = e.detail.value.card_id;
    var that = this;
    
    // 前台检测
    if (card_id == "") {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'none'
      })
      return;
    }
    if (card_id.length != 10) {
      wx.showToast({
        title: '请输入10位学号！',
        icon: 'none'
      })
      return;
    }

    user_api.addUser({
      school: school,
      card_id: card_id,
    })
    .then(res => {
      console.log(res);
      app.globalData.user_id = res._id
      wx.switchTab({
        url: '../index/index',
      })
    })
    .catch(err => {
      console.log(err);
      wx.showToast({
        title: '该学号已存在！',
        icon: 'none'
      });
    });
  },

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})