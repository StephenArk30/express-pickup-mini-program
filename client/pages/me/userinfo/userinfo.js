// userinfo.js
// 用户信息

const app = getApp()

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
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    var that = this
    wx.request({
      url: app.globalData.api + '/get_user',
      data: {'user_id': app.globalData.user_id},
      success (res) {
        console.log(res.data)
        that.setData ({
          tele: res.data.tele,
          card_id: res.data.card_id
        })
        if (res.data.name) that.setData({ name: res.data.name })
        if (res.data.school) that.setData({ index: res.data.school })
        if (res.data.wechat) that.setData({ wechat: res.data.wechat })
        if (res.data.qq) that.setData({ qq: res.data.qq })
        if (res.data.station) that.setData({ j: res.data.station })
        if (res.data.destination) that.setData({ k: res.data.destination })
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: app.globalData.api + '/edit_user',
      method: 'POST',
      data: {
        'user_id': app.globalData.user_id,
        'school': e.detail.value.school,
        'name': e.detail.value.name,
        'tele': e.detail.value.tele,
        'wechat': e.detail.value.wechat,
        'qq': e.detail.value.qq,
        'card_id': e.detail.value.card_id,
        'stat': e.detail.value.station,
        'dest': e.detail.value.destination,
      },
      success () {
        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      }
    })
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