// pages/platform/addexpress/addexpress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选取学校的数据
    express_station: ['杜鹃山菜鸟驿站', '桂庙菜鸟驿站'],
    objectArray: [
      {
        id: 0,
        name: '杜鹃山菜鸟驿站'
      },
      {
        id: 1,
        name: '桂庙菜鸟驿站'
      },
    ],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  nextPage: function () {
    wx.navigateTo({
      url: '../addexpress2/addexpress2',
    })
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})