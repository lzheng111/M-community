Page({
  data: {
    array: [],
    showIcon:true,
    searchList: null,
    showBackToTop:false
  },
  onShow(){
    const {tel} = wx.getStorageSync('userInfo') || wx.getStorageSync('user')
    wx.p.request({
      url:'http://localhost:3000/api/check/repairs',
      method:'POST',
      data:{
        tel
      }
    }).then(res =>{
      this.setData({
        array:res.data.data.reverse()
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  handleInputChange(e){
    const value = e.detail.value;
    let searchList = null
      if(value){
      searchList = this.data.array.filter(item =>item.type.indexOf(value) >-1 || item.createdAt.indexOf(value) >-1 || item._id.indexOf(value) >-1) 
    }
    this.setData({
      showIcon: value ? false : true,
      searchList
    })
  },

  //折叠面板
  panel: function (e) {
    //获取到元素的id值
    var id = e.currentTarget.dataset.index;
    //获取到全部数据
    var items = this.data.array;
    //获取到当前元素的显示与隐藏
    //var ishow = !items[id].toggle;
    //将新的toggle值复制给原来的toggle
    items[id].toggle = !items[id].toggle;
    this.setData({
      array: items
    }) 
  },

  //返回顶部
  gotop:function(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.setData({
        showBackToTop:false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  touchEnd(e){
  let scrollTop = e.changedTouches[0].pageY -e.changedTouches[0].clientY ;
    if(scrollTop>50){
      this.setData({
        showBackToTop:true
      })
    }else if(scrollTop ===0){
      this.setData({
        showBackToTop:false
      })
    }
  },
  isDelete(e){
    let _id = e.currentTarget.dataset.id;
    let that = this
     wx.showModal({
       title: '提示',
       content: '是否删除该维修订单',
       success:function(res) {
        if (res.confirm) {
           wx.p.request({
            url:'http://localhost:3000/api/delete/repairs',
            method:'POST',
            data:{
              _id
            }
          }).then(res =>{
           that.onShow()

           wx.showToast({
             title: '删除成功',
             icon: 'success',
             duration: 1000
           })
          }).catch(err =>{
       
           wx.showToast({
             title: '删除失败',
             icon: 'success',
             duration: 1000
           })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        } 
       }

     })
   }
})
