import { request } from "../../request/index.js"

Page({
  data: {
		leftMenuList:[],
		rightContent:[],
		currentIndex: 0,
		scrollTop: 0
  },
	Cates: [],
  onLoad() {
		const Cates = wx.getStorageSync("cates")
		if(!Cates){
			this.getCates()
		}else{
			if(Date.now()-Cates.time>1000*10){
				this.getCates()
			}else{
				this.Cates = Cates.data;
				this.sjhc()
			}
		}
	},
	// 页面一加载就调用
	async getCates(){
		// request({url: "/categories"})
		// .then( result => {
		// 	this.Cates = result.data.message
		// 	wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
		// 	console.log(this.Cates)
			
		// 	this.sjhc()
		// })
		const res = await request({url:"/categories"})
		console.log(res)
			this.Cates = res
			wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
			this.sjhc()
	},
	// 左侧菜单
	getLeftMenu(e){
		console.log(e.target.dataset.index)
		const {index} = e.target.dataset
		let rightContent = this.Cates[index].children;

		this.setData({
			currentIndex : index,
			rightContent,
			scrollTop: 0
		})
	},
	// 共用
	sjhc(){
		let leftMenuList = this.Cates.map(v=>v.cat_name);
		let rightContent = this.Cates[0].children;
		this.setData({
			leftMenuList,
			rightContent
		})
	}
})