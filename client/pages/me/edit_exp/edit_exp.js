// edit_exp.js
// 修改快递

const app = getApp();
const express_api = require('../../../api/express.js');

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
      });
    }
    if (this.data.destination[this.data.exp.destination]) {
      this.setData({
        j: this.data.exp.destination,
        d_state: true,
        dest_color: 0
      });
    }
  },

  publish: function (e) {
    let express = e.detail.value;

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

    express_api.editExp(this.data.exp._id, express)
    .then(res => {
      wx.showModal({
        title: '修改成功',
        content: '成功修改了快递',
        showCancel: false,
        success: function () {
          wx.navigateBack({
            delta: 1
          });
        }
      });
    });
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