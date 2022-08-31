// pages/collection/views/park/park.js
Page({
  data:{
    userInfo:{},
    msgList: [
      { url: '', title: "提醒：未登记车牌号车辆进入停车场必须登记" },
      { url: '', title: "提醒：在社区停车场内禁止乱停乱放" },
      { url: '', title: "提醒：进停车场车辆和司机要保持场内清洁" }
    ]
  },
  onShow(){
   const userInfo = wx.getStorageSync('userInfo') || wx.getStorageSync('user')
   wx.p.request({
     url:'http://localhost:3000/api/user/check/user',
     method:'POST',
     data:{
       tel:userInfo.tel
     }
   }).then(res =>{
      this.setData({
        userInfo:res.data.data
      })
   }).catch(err =>{
    wx.showToast({
      title: '页面加载失败，请重新进入',
      icon: 'error',
      duration: 1000
    })
   })
  
  },
  goToOder(){
    wx.navigateTo({
      url: `/pkgA/pages/parkoder/parkoder?tel=${this.data.userInfo.tel}`,
    })
  },
  udateCarNumber(){
    wx.navigateTo({
      url: `/pkgA/pages/udatepark/updatepark?_id=${this.data.userInfo._id}&carnumber=${this.data.userInfo.carnumber}`,
    })
  }
})