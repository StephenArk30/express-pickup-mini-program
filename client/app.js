//app.js
const config = require('config.js');

App({
  onLaunch: function () {
    wx.cloud.init({
      env: config.envName
    });
  },
  globalData: {
    user_id: -1,
    express_station: [
      '杜鹃山菜鸟驿站', '桂庙菜鸟驿站',
      '南区菜鸟驿站', '南区宿舍门外'
      ], // 快递站
    destination: [
      '丹枫轩', '木犀轩', '乔相',
      '斋区',
      '春笛', '夏筝', '秋瑟', '冬筑'
      ], // 宿舍楼
  }
})