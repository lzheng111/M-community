// pages/detail/detail.js
Page({
  data:{
   headline:'',
   content:'',
   createdDay:'',
   createdTime:''
  },
  onLoad(options){
    wx.p.request({
      url:'http://localhost:3000/api/check/notice',
      method:'POST',
      data:{
        _id:options.id
      }
    }).then(res =>{
      let noticeList =res.data.data
      let time = noticeList[0].createdAt.split('T')[1]
      this.setData({
        headline:noticeList[0].headline,
        content:noticeList[0].content,
        createdData:noticeList[0].createdAt.split('T')[0],
        createdTime:time.split('.')[0]
      })
       
    }).catch(err =>{
      wx.showToast({
        title: '公告查看失败',
        icon: 'error',
        duration: 1000
      })
    })
  }
})