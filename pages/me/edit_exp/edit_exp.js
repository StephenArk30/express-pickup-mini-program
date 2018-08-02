// pages/me/edit_exp/edit_exp.js

const app = getApp()

Page({

  data: {
    exp: [],
    // 选取学校的数据
    express_station: app.globalData.express_station,
    i: 0,
    s_state: false,
    stat_color: 1,
    destination: app.globalData.destination,
    j: 0,
    d_state: false,
    dest_color: 1,
    color: ['black', 'grey', '#6c0022'],
    hr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // hr分割线的颜色
    c_checked: [false, false, false] // 联系方式前面的选择按钮
  },

  onLoad: function (options) {
    // console.log(options)
    this.setData({ exp: JSON.parse(options.exp) })
    if (this.data.express_station[this.data.exp.starting]) {
      this.setData({
        i: this.data.exp.starting,
        s_state: true,
        stat_color: 0
      })
    }
    if (this.data.destination[this.data.exp.dest]) {
      this.setData({
        j: this.data.exp.dest,
        d_state: true,
        dest_color: 0
      })
    }
  },

  publish: function (e) {
    var that = this
    var start // 快递站
    if (e.detail.value.stat == 0) start = this.data.i
    else start = e.detail.value.other_start // 快递站详细地址

    var dest // 目的地
    if (e.detail.value.dest == 0) dest = this.data.j
    else dest = e.detail.value.other_dest // 详细地址

    var pay = e.detail.value.payment // *感谢金
    var anoy = e.detail.value.anoy // 是否匿名
    var owner = e.detail.value.ownername // *收件人
    var tips = e.detail.value.tips // 简略备注
    var e_id = e.detail.value.express_id // *快递号
    var dest_d = e.detail.value.destination_room // 更详细地址
    var size = e.detail.value.size // 大小
    var weight = e.detail.value.weight // 重量
    var tips_d = e.detail.value.tips_detail // 详细备注

    var tele = e.detail.value.tele // 电话
    var wechat = e.detail.value.wechat // 微信号
    var qq = e.detail.value.qq // QQ

    if (start == '') {
      wx.showToast({
        title: '请填写快递站地址！',
        icon: 'none'
      })
      return;
    }
    if (dest == '') {
      wx.showToast({
        title: '请填写目的地地址！',
        icon: 'none'
      })
      return;
    }
    if (pay == '' || owner == '' || e_id == '') {
      wx.showToast({
        title: '请填写*号内容！',
        icon: 'none'
      })
      return;
    }
    if (tele == '' && wechat == '' && qq == '') {
      wx.showToast({
        title: '请填写至少一种联系方式！',
        icon: 'none'
      })
      return;
    } else {
      if (tele && tele.length != 11) {
        wx.showToast({
          title: '请输入11位手机号！',
          icon: 'none'
        })
        return;
      }
      if (wechat && (wechat.length < 6 || wechat.length > 20)) {
        wx.showToast({
          title: '请输入5~20位微信号！',
          icon: 'none'
        })
        return;
      }
      if (qq && qq.length < 5) {
        wx.showToast({
          title: '请输入至少5位QQ号！',
          icon: 'none'
        })
        return;
      }
    }

    wx.request({
      url: app.globalData.api + '/edit_express',
      method: 'POST',
      data: {
        id: that.data.exp.id,
        start: start,
        dest: dest,
        pay: pay,
        anoy: anoy,
        owner: owner,
        tips: tips,
        e_id: e_id,
        dest_d: dest_d,
        size: size,
        weight: weight,
        tips_d: tips_d,
        tele: tele,
        wechat: wechat,
        qq: qq
      },
      success() {
        wx.showModal({
          title: '修改成功',
          content: '成功修改了快递',
          showCancel: false,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },

  e_s_Change: function (e) {
    // console.log('快递站发送选择改变，携带值为', e.detail.value)
    this.setData({
      i: e.detail.value
    })
  },
  dest_Change: function (e) {
    // console.log('目的地发送选择改变，携带值为', e.detail.value)
    this.setData({
      j: e.detail.value
    })
  },

  Stat_Change: function (e) {
    // console.log('起点发生change事件，携带value值为：', e.detail.value)
    this.setData({ stat_color: 1 - this.data.stat_color })
  },
  Dest_Change: function (e) {
    // console.log('终点发生change事件，携带value值为：', e.detail.value)
    this.setData({ dest_color: 1 - this.data.dest_color })
  },

  focus: function (e) {
    var hr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    hr[e.currentTarget.id] = 2
    this.setData({ hr: hr })
  }
})