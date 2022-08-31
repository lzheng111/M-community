// pages/collection/views/complaint/complaint.js
Page({
  data:{
    value:''
  },
  onShow(){
    const {tel} = wx.getStorageSync('userInfo') || wx.getStorageSync('user')
    this.setData({
      tel
    })
  },
  formSubmit(e){
    let content = e.detail.value.content
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否进行投诉',
      success:function(res) {
        if (res.confirm) {
        wx.p.request({
              url:'http://localhost:3000/api/add/retroaction',
              method:'POST',
              data:{
                content,
                type:'投诉',  
                tel:that.data.tel

              }
            }).then(res =>{
              wx.redirectTo ({
                url: '/pages/profile/pages/retroactionhistory/retroactionhistory',
              })
              wx.showToast({
                title: '已投诉',
                icon: 'success',
                duration: 2000
              })  
            })
        }
          }
    })
  },
  bindinput(e){
    this.setData({
      value:e.detail.value
    })
  }
})