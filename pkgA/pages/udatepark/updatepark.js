// pkgA/pages/udatepark/updatepark.js
Page({
  data:{
    _id:'',
    carnumber:'',
    value:''
  },
  onLoad(options){
    let {_id,carnumber} = options;
    this.setData({
      _id,
      carnumber
    })
  },
  formSubmit(e){
    let that = this
    let carnumber = e.detail.value.carnumber
    wx.showModal({
      title: '提示',
      content: '是否进行修改',
      success:function(res) {
        if (res.confirm) {
        wx.p.request({
          url:'http://localhost:3000/api/user/update/user',
          method:'POST',
          data:{
            _id:that.data._id,
            carnumber
          }
        }).then(res =>{
          console.log(res);
          if(res.data.errno ===0){
            wx.navigateBack()
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })  
          }
        }).catch(err =>{
          wx.showToast({
            title: '修改失败，请重新修改',
            icon: 'error',
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