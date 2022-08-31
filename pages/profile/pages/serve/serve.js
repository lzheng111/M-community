Page({

  break(){
    wx.clearStorage()
    wx.setStorage({
      key: 'userPic',
      data:''
    })
  }
})