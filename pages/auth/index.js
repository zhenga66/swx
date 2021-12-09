import {login} from "../../utils/asyncWx"
import {request} from "../../request/index"

Page({
  data:{
  },

  getUserProfile(){
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        this.aaa(res)
      }
    })
  },
  async aaa(e){
    // try {
      const {encryptedData, rawData, iv, signature} = e;
      const {code} = await login();
      const loginParams = {encryptedData, rawData, iv, signature,code}
      console.log(loginParams)
      const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      if(res == null){
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        console.log(token)
        wx.setStorageSync('token', token);
        wx.navigateBack({
          delta: 1
        })
      }
     
    // } catch(error){
    //   console.log(error)
    // }
  }
})