Page({
  data: {
    userinfo: {}
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    console.log(userinfo)
    this.setData({
      userinfo
    })
  },
})