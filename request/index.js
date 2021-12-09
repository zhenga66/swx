// 同时发送请求次数
let ajaxTimes = 0;
export const request = (params) => {
  let header = {...params.header};
  if(params.url.includes("/my/")){
    header["Authorization"] = wx.getStorageSync("token")
  }
  ajaxTimes++; 
  // 显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // 定义公共的url
  const URL = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
     ...params,
     header: header,
     url: URL + params.url,
     success: result => {
      resolve(result.data.message)
      // console.log(result)
     },
     fail: err => {
      reject(err)
     },
     complete: ()=>{ 
      //  关闭正在等待的图标
      ajaxTimes--
      if(ajaxTimes === 0){ 
        wx.hideLoading()
      }
     }
    })
  })
}