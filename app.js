//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.api + '/get_user_id',
          data: {
            code: res.code
          },
          success: usr => {
            this.globalData.user_id = usr.data.user_id //返回userid
            this.globalData.open_id = usr.data.open_id //返回openid
            console.log(usr.data)
            console.log('user_id: ', usr.data.user_id)
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user_id: -1,
    open_id: '',
    express_station: ['杜鹃山菜鸟驿站', '桂庙菜鸟驿站'],
    destination: ['丹枫轩', '木犀轩'],
    // api: 'http://127.0.0.1:5000'
    api: 'http://120.79.247.160:8080'
  }
})