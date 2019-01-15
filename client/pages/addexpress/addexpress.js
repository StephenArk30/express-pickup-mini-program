// addexpress.js
// 添加快递的页面

const app = getApp()

Page({

  data: {
    name: '',
    tele: '',
    wechat: '',
    qq: '',

    express_station: app.globalData.express_station,
    i: 0,
    stat_color: 0,
    destination: app.globalData.destination,
    j: 0,
    dest_color: 0,
    color: ['black', 'grey', '#6c0022'],
    hr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // hr分割线的颜色
    c_checked: [false, false, false] // 联系方式前面的选择按钮
  },

  onLoad: function () {
    var that = this
    // 加载用户默认信息
    wx.request({
      url: app.globalData.api + '/add_express',
      data: {'user_id': app.globalData.user_id},
      success (res) {
        if (res.data.stat) that.setData({i: res.data.stat})
        if (res.data.dest) that.setData({j: res.data.dest})
        if (res.data.name) that.setData({name: res.data.name})
        that.setData({
          tele: res.data.tele,
          wechat: res.data.wechat,
          qq: res.data.qq
        })
      }
    })
  },

  publish: function (e) {
    var that = this
    var start // 快递站
    if (e.detail.value.stat == 0) start = this.data.i
    else start = e.detail.value.other_start // 快递站详细地址

    var dest // 目的地
    if (e.detail.value.dest == 0) dest = this.data.j
    else dest = e.detail.value.other_dest // 详细地址

    console.log("start: " + start + " dest: " + dest)

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

    // 检查输入的合法性
    if (start.length == 0) {
      wx.showToast({
        title: '请填写快递站地址！',
        icon: 'none'
      })
      return;
    }
    if (dest.length == 0) {
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

    // 像服务器发送添加快递请求
    wx.request({
      url: app.globalData.api + '/add_express',
      method: 'POST',
      data: {
        start: start,
        dest: dest,
        pay: pay,
        anoy: anoy,
        owner: owner,
        owner_id: app.globalData.user_id,
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
      success () {
        wx.showModal({
          title: '发布成功',
          content: '成功发布了快递',
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
    this.setData({ i: e.detail.value })
  },
  dest_Change: function (e) {
    // console.log('目的地发送选择改变，携带值为', e.detail.value)
    this.setData({ j: e.detail.value })
  },

  Stat_Change: function (e) {
    // console.log('起点发生change事件，携带value值为：', e.detail.value)
    this.setData({ stat_color: 1 - this.data.stat_color })
  },
  Dest_Change: function (e) {
    // console.log('终点发生change事件，携带value值为：', e.detail.value)
    this.setData({ dest_color: 1 - this.data.dest_color })
  },

  // 设置获得焦点的输入框下的分割线颜色
  focus: function (e) {
    // console.log(e)
    var hr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    hr[e.currentTarget.id] = 2
    this.setData({ hr: hr })
  }
})