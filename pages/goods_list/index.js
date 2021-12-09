import { request } from "../../request/index.js"

Page({
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
    ima: '../../image/fai.jpg'
  },
  QueryParams:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  onLoad(options) {
    console.log(options)
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    // 获取 总条数
    const total = res.total;
    console.log(res)
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages)
    // 赋值
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    const {index} = e.detail
    console.log(index)
    let {tabs} = this.data
    tabs.forEach((v,i) =>{
      i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  // 上拉获取数据
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPages){
      console.log("没有下一页")
      wx.showToast({
        title: '没有下一页了',
        icon: 'error',
      })
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // 重置数组
    this.setData({
      goodsList: [],
    })
    // 重置页码
    this.QueryParams.pagenum = 1 
    // 发送请求
    this.getGoodsList()
  }
})
