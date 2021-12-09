import { request } from "../../request/index.js"

Page({
  data: {
    goodsObj: {}
  },
  GoodsInfo:{},
  onLoad(e) {
    this.getGoodsDetail(e.goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(e){
    const goodsObj = await request({url:"/goods/detail", data:{goods_id:e}});
    this.GoodsInfo = goodsObj;
    console.log(goodsObj)
    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      }
    })
  },
  // 点击轮播图 放大预览
  handlePrevewImage(e){
    const current = e.currentTarget.dataset.url
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd(){
    // 获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart')||[];
    // 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)

    if(index === -1){
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else{
      // 已经存在购物车数据 执行 num++
      cart[index].num++
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })
  }
})