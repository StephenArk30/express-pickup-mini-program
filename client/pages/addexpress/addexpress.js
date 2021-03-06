// addexpress.js
// 添加快递的页面

const app = getApp();
const express_api = require('../../api/express');
const user_api = require('../../api/user.js');

Page({

  data: {
    name: '',
    tele: '',
    wechat: '',
    qq: '',

    express_station: app.globalData.express_station,
    i: 0,j: 0,
    stat_color: 0,
    destination: app.globalData.destination,
    dest_color: 0,
    color: ['black', 'grey', '#6c0022'],
    hr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // hr分割线的颜色
    c_checked: [false, false, false] // 联系方式前面的选择按钮
  },

  onLoad: function () {
    let that = this;
    user_api.getUserByID(app.globalData.user_id)
    .then(res => {
      user = res[0];
      if (user.stat) that.setData({ i: user.stat });
      if (user.dest) that.setData({ j: user.dest });
      if (user.name) that.setData({ name: user.name });
      that.setData({
        tele: user.tele,
        wechat: user.wechat,
        qq: user.qq
      });
    })
    .catch(err => {});
  },

  publish: function (e) {
    let express = e.detail.value;
    express.owner_id = app.globalData.user_id;

    express.start = this.data.stat_color === 0 ? this.data.i : express.other_start; // 快递站
    express.dest = this.data.dest_color === 0 ? this.data.j : express.other_dest; // 目的地

    // 检查输入的合法性
    if (express.start.length === 0) {
      this.publish_fail('请填写快递站地址！');
      return;
    }
    if (express.dest.length === 0) {
      this.publish_fail('请填写目的地地址！');
      return;
    }
    if (express.pay === '' || express.owner === '' || express.e_id === '') {
      this.publish_fail('请填写*号内容！');
      return;
    }
    if (express.tele === '' && express.wechat === '' && express.qq === '') {
      this.publish_fail('请填写至少一种联系方式！');
      return;
    } else {
      if (express.tele && express.tele.length !== 11) {
        this.publish_fail('请输入11位手机号！');
        return;
      }
      if (express.wechat && (express.wechat.length < 6 || express.wechat.length > 20)) {
        this.publish_fail('请输入5~20位微信号！');
        return;
      }
      if (express.qq && express.qq.length < 5) {
        this.publish_fail('请输入至少5位QQ号！');
        return;
      }
    }

    express_api.addExp(express)
      .then((res) => {
        console.log(res);
        wx.showModal({
          title: '发布成功',
          content: '成功发布了快递',
          showCancel: false,
          success: function () { wx.navigateBack({ delta: 1 }); }
        });
      }).catch((error) => {this.publish_fail('发布失败，请稍后重试');});
  },   

  publish_fail: function (title) {
    wx.showToast({
      title: title,
      icon: 'none'
    });
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
    // console.log('起点发生change事件，携带value值为：', e.detail.value);
    this.setData({ stat_color: 1 - this.data.stat_color })
  },
  Dest_Change: function (e) {
    // console.log('终点发生change事件，携带value值为：', e.detail.value)
    this.setData({ dest_color: 1 - this.data.dest_color })
  },

  // 设置获得焦点的输入框下的分割线颜色
  focus: function (e) {
    // console.log(e)
    var hr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    hr[e.currentTarget.id] = 2;
    this.setData({ hr: hr })
  }
});
