  import { request } from "../../request/index.js"

  Page({
    data: {
      swiperList: [],
      catesList: [],
      floorList: [],
    },
    onLoad(){
      this.getSwiperList()
      this.getCatesList()
      this.getFloorList()
    },
    // 轮播图
    getSwiperList(){
      request({url: "/home/swiperdata"})
      .then( result => {
        this.setData({
          swiperList: result
        })
      })
    },
    // 分类导航
    getCatesList(){
      request({url: "/home/catitems"})
      .then( result => {
        this.setData({
          catesList: result
        })
      })
    },
    // 楼层
    getFloorList(){
      request({url: "/home/floordata"})
      .then( result => {
        this.setData({
          floorList: result
        })
      })
    },
})