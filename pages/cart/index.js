import {showModal,showToast} from "../../utils/asyncWx";

Page({
  data: {
    address:{},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  }, 
  onShow(){
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart')||[];
    // 计算全选
    // every 数组方法 会遍历 会接收一个回调函数 那么每一个回调函数都会返回true 那么 every方法的返回值true
    // 只要 有一个回调函数返回false 那么不在循环执行， 直接返回false
    // 空数组 调用 every,返回值就是true
    // const allChecked =cart.length?cart.every(v => v.checked):false;
   
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 点击收获地址
  handleChooseAddress(){
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
        let address = res;
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
        wx.setStorageSync('address', address)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  // 商品的选中
  handeItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked=!cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart){
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach( v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num
      }else{
        allChecked = false;
      }
    })
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
    })
    wx.setStorageSync('cart', cart)
  },
  // 全选
  handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    console.log(cart)
    cart.forEach(v=>v.checked = allChecked)
    this.setCart(cart)
  },
  // handReduce(e){
  //   const goods_id = e.currentTarget.dataset.id;
  //   let {cart} = this.data;
  //   let index = cart.findIndex(v=>v.goods_id === goods_id);
    
  //   if(cart[index].num > 0){
  //     cart[index].num --
  //   }
  //   console.log(cart)
  //   this.setCart(cart)
  // }
  // 商品数量的编辑功能
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id === id);
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content:"您是否要删除？"});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }

    // cart[index].num+=operation;
    // if(cart[index].num < 1){
    //   wx.showToast({
    //     title: '不能再减少啦',
    //     icon: 'none'
    //   })
    //   cart[index].num = 1
    // }
    // this.setCart(cart);
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
  }
})