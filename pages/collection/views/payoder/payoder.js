// pages/collection/views/payoder/payoder.js
Page({
  data:{
    payOderList:{}
  },
  onLoad(options){
    this.setData({
      payOderList:options
    })
  },
  handlePay(){
   let _id = this.data.payOderList._id
    wx.showModal({
      title: '提示',
      content: '是否进行支付',
      success: function (res) {
        if (res.confirm) {
          wx.p.request({
            url:'http://localhost:3000/api/update/pay',
            method:'POST',
            data:{
              _id,
              state:'已缴费'
            }
          }).then(res =>{
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(() =>{
              wx.navigateBack()
            },500)
            
          }).catch(err =>{
            wx.showToast({
              title: '支付失败',
              icon: 'error',
              duration: 1000
            })
          })
         
        }
      }
    })
  }
})