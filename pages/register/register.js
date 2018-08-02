// register.js

const app = getApp()

Page({

  // 页面的初始数据
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
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

    // 数据发送至后台
    var url = app.globalData.api + "/register";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        wechat_id: app.globalData.open_id,
        school: school,
        card_id: card_id,
      },
      header: {
        'Content-Type': 'application/json' // 返回json格式，必须要加
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        if(res.data.have_res) {
          wx.showToast({
            title: '该学号已存在！',
            icon: 'none'
          })
          return;
        }
        else{
            app.globalData.user_id = res.data.user_id
            wx.switchTab({
              url: '../index/index',
            })
        }
      }
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})