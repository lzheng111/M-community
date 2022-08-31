Page({
  data:{
    noticeList:[],
    showIcon:true,
    searchList: null,
  },
  onShow(){
    let {tel} = wx.getStorageSync('user') || wx.getStorageSync('userInfo')
    wx.p.request({
      url:'http://localhost:3000/api/check/message',
      method:'POST',
      data:{
        tel
      }
    }).then(res =>{
      let noticeList = res.data.data
      this.setData({
        noticeList
      })
    })
  },
  deleteNotice(e){
    const that = this
    let _id = e.currentTarget.dataset.id.trim()
    wx.showModal({
      title: '提示',
      content: '确定要删除此消息吗？',
      success: function (res) {
        if (res.confirm) {
          wx.p.request({
            url:'http://localhost:3000/api/delete/message',
            method:'POST',
            data:{
              _id
            }
          }).then(res =>{
            setTimeout(() =>{
              that.onShow()
            },200)
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
          }).catch(err =>{
            wx.showToast({
              title: '删除失败',
              icon: 'error',
              duration: 1000
            })
          })
        }
      }
    })
  },
  goToMore(e){
    let{headline,content,time} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pkgA/pages/noticedetail/noticedetail?headline=${headline}&content=${content}&createdAt=${time}`,
    })
  },
//  / /下拉刷新
  onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '刷新中...',
    })
    this.onShow()
    setTimeout(() =>{
      wx.hideLoading()//完成停止加载框
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    },300)
   
  },

  handleInputChange(e){
    const value = e.detail.value;
    let searchList = null
      if(value){
      searchList = this.data.noticeList.filter(item =>item.content.indexOf(value) >-1 || item.createdAt.indexOf(value) >-1 || item.headline.indexOf(value) >-1 ) 
    }
    this.setData({
      showIcon: value ? false : true,
      searchList
    })
  },
})