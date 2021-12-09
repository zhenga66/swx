// 购物车删除
export const showModal= ({content}) =>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      success:(res)=> {
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
// 结算
export const showToast= ({title}) =>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success:(res)=> {
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
// 授权
export const login= () =>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}
// 支付
export const requestPayment= (pay) =>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: (res) =>{
        resolve(res)
      },
      fail: (err) =>{
        reject(err)
      }
    })
  })
}
// 获取用户
export const handleGetUserProfile = () =>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) =>{
        resolve(res)
      },
      fail: (err) =>{
        reject(err)
      }
    })
  })
}