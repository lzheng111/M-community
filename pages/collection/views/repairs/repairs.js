// pages/collection/views/repairs/repairs.js
Page({
  data(){
    userInfo:{}
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
  },
  formSubmit(e){
    wx.showModal({
      title: '提示',
      content: '是否预约维修',
      success:function(res) {
        if (res.confirm) {
          wx.p.request({
            url:'http://localhost:3000/api/add/repairs',
            method:'POST',
            data:{
              name:e.detail.value.name,
              tel:e.detail.value.tel,
              site:e.detail.value.site,
              type:e.detail.value.content
            }
          }).then(res =>{
          
            wx.redirectTo ({
              url: '/pages/profile/pages/repairshistory/repairshistory',
            })
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })   
          })

        }
    }
    })
   
  }
})