import {showModal,showToast,requestPayment} from "../../utils/asyncWx";
import { request } from "../../request/index";

Page({
  data: {
    address:{},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  }, 
  onShow(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked);
    
    this.setData({
      address
    })
      // 总价格 总数量
      let totalPrice = 0;
      let totalNum = 0;
      cart.forEach( v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num
      })
      this.setData({
        cart,
        totalPrice,
        totalNum,
        address
      })
  },
  // 结算
  async handlePay(){
    const {address,totalNum} = this.data;
    // 判断收货地址
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return
    }
    // 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 点击 支付
  async handlePrderPay(){
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    // console.log("已经存在token")
    // 请求头参数
    const header = {Authorization:token};
    // 请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart
    let goods = [];
    cart.forEach(v=>{
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      })
    })
    const orderParams = {order_price,consignee_addr,goods}
    // 发送请求 获取订单编号
    const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header:header})
    console.log(order_number)
    const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"POST",header:header,data:{order_number}})
    console.log(pay)
    const res = await requestPayment(pay);
    
  }
})