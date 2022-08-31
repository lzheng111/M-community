// pages/profile/profile.js
Page({
  data:{
    userInfo:{},
    userPic:''
  },
  onShow(){
    let {tel} = wx.getStorageSync('user') || wx.getStorageSync('userInfo')
    wx.p.request({
      url:'http://localhost:3000/api/user/check/user',
      method:'POST',
      data:{
        tel
      }
    }).then(res =>{
      let userInfo = res.data.data
       this.setData({
         userInfo
       }) 
    })   
        wx.getStorage({
          key: 'userPic',
        }).then(res =>{
          this.setData({
            userPic:res.data
          })
        })
  
  },
  goToPayHistory(){
    wx.navigateTo({
      url: '/pages/profile/pages/payhistory/payhistory',
    })
  },
  goToRepairsHistory(){
    wx.navigateTo({
      url: '/pages/profile/pages/repairshistory/repairshistory',
    })
  },
  goToRetroactionHistory(){
    wx.navigateTo({
      url: '/pages/profile/pages/retroactionhistory/retroactionhistory',
    })
  },
  goToServe(){
    wx.navigateTo({
      url: '/pages/profile/pages/serve/serve',
    })
  },
  goToPersonal(){
    wx.navigateTo({
      url: `/pages/profile/pages/personal/personal?tel=${this.data.userInfo.tel}`,
    })
  },
  goToMap(){
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  gpToProperty(){
     wx.navigateTo({
    url: '/pages/profile/pages/toproperty/toproperty',
  })
  }
 
})