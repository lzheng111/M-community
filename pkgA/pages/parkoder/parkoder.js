// pkgA/pages/parkoder/parkoder.js
Page({
  data:{
    userInfo:{},
    value:''
  },
  onLoad(options){
    let {tel} = options;
    wx.p.request({
      url:'http://localhost:3000/api/user/check/user',
      method:'POST',
      data:{
        tel
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
  formSubmit(e){
    let carnumber = e.detail.value.carnumber
    wx.p.request({
      url:'http://localhost:3000/api/user/update/user',
      method:'POST',
      data:{
        _id:this.data.userInfo._id,
        carnumber
      }
    }).then(res =>{
      if(res.data.errno ===0){
        wx.navigateBack()
        wx.showToast({
          title: '登记成功',
          icon: 'success',
          duration: 2000
        })  
      }
    }).catch(err =>{
      wx.showToast({
        title: '登记失败，请重新登记',
        icon: 'error',
        duration: 2000
      })  
    })
  
  },


  bindinput(e){
    this.setData({
      value:e.detail.value
    })
  }
})