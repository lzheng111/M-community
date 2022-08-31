// pages/profile/pages/personal/personal.js
Page({
  data:{
    userInfo:{},
    userPic:'',
    showActionsheet:true,
    groups: [
      {sex:'男'},
      {sex:'女'},
      {sex:'保密'},
    ],
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
   }).catch(err =>{
    wx.showToast({
      title: '资料查看失败，请重试再试',
      icon: 'error',
      duration: 1000
    })
  })
  const userPic =wx.getStorageSync('userPic')
  this.setData({
    userPic
  })
  },
  handleChange(e){
    wx.navigateTo({
      url: `/pkgA/pages/personalserve/personalserve?name=${e.currentTarget.dataset.id}&_id=${this.data.userInfo._id}`,
    })
  },
  button(){
     this.setData({showActionsheet:false});
  },

  actionsheetChange(){
    this.setData({showActionsheet:true});
  },

  itemTap(e){
    let sex = e.currentTarget.dataset.sex.toString()
    wx.p.request({
      url:'http://localhost:3000/api/user/update/user',
      method:'POST',
      data:{
        _id:this.data.userInfo._id,
        sex:sex
      }
    }).then(res =>{
      if(res.data.errno === 0){
        this.setData({showActionsheet:true});
        wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
        setTimeout(() =>{
           wx.hideToast();
        },400)
        this.onShow()
      }
    
    })
  }
})