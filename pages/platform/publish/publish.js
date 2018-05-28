// publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var url = "127.0.0.1/get_express";
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json' // 返回json格式，必须要加
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data.express);
        that.setData({
          expresses: res.data.express // 将返回的数据放在expresses里
        });
      }
    })
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
  goToaddExpress: function () {
    wx.navigateTo({
      url: '../addexpress/addexpress1/addexpress1'
    })
  }
})