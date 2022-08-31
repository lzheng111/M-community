// pages/collection/views/pay/pay.js
Page({
  data:{
    payList:[],
    tel:'',
    show: false,
  },
  // onShow(){
  //  const a = wx.getStorageSync('userInfo') ||wx.getStorageSync('user')
  //  this.setData({
  //    tel:a.tel
  //  })
  // },
  onShow(){
    const a = wx.getStorageSync('userInfo') ||wx.getStorageSync('user')
    this.setData({
      tel:a.tel
    })
    wx.p.request({
      url:'http://localhost:3000/api/check/user/nopay',
      method:'POST',
      data:{
        tel:this.data.tel
      }
    }).then(res =>{
      this.setData({
        payList:res.data.data
      })
    }).catch(err =>{
      wx.showToast({
        title: '获取缴费信息失败，请重新刷新页面',
        icon: 'error',
        duration: 1000
      })
    })
  },
  
  //下拉刷新
  onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '刷新中...',
    })
    wx.p.request({
      url:'http://localhost:3000/api/check/user/nopay',
      method:'POST',
      data:{
        tel:this.data.tel
      }
    }).then(res =>{
      this.setData({
        payList:res.data.data,
      })
      wx.hideLoading()//完成停止加载框
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    }).catch(err =>{
      wx.showToast({
        title: '获取缴费信息失败，请重新刷新页面',
        icon: 'error',
        duration: 1000
      })
    })
  },
  btnToOder(e){
    // console.log(e.currentTarget.dataset.id);
    const {_id,content,area,money,name,site,tel,createdAt} = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/collection/views/payoder/payoder?_id=${_id}&content=${content}&money=${money}&name=${name}&site=${site}&tel=${tel}&area=${area}&createdAt=${createdAt}`,
    })
  }
  
})