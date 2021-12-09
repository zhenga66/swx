import { handleGetUserProfile } from "../../utils/asyncWx"

Page({
  data: {
  },
  onLoad(options) {

  },
  async handleGetUserProfile(){
    const {userInfo} = await handleGetUserProfile();
    console.log(userInfo)
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1,
    })
  }
})