// pages/home/home.js
Page({
  data:{
    showIcon: true,
    searchList: null,
    showBackToTop:false,
    swiperList:[],
    noticeList:[]

},
onShow(){
  wx.p.request({
    url:'http://localhost:3000/api/check/allpic',
    method:'POST'
  }).then(res =>{
     let swiperList = res.data.data
     for(let item of swiperList){
       item.url = item.url.replace(/\\/g,'/')
     }
     this.setData({
       swiperList
     })
  }).catch(err =>{
    console.log(err);
  })
  wx.p.request({
    method:'POST',
    url: 'http://localhost:3000/api/check/allnotice',
  }).then(res =>{
     this.setData({
       noticeList:res.data.data
     })
  })
},

handleInputChange(e){
  const value = e.detail.value;
  let searchList = null
  if(value){
    searchList = this.data.noticeList.filter(item =>item.headline.indexOf(value) >-1)
  }
  this.setData({
    showIcon: value ? false : true,
    searchList
  })
},
handleCourseTap(e){
  const {id} = e.currentTarget.dataset
  wx.navigateTo({
    url: `/pages/detail/detail?id=${id}`,
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
  if(scrollTop > 50){
    this.setData({
      showBackToTop:true
    })
  }else if(scrollTop ===0){
    this.setData({
      showBackToTop:false
    })
  }
},

//下拉刷新
onPullDownRefresh:function()
{
  wx.showNavigationBarLoading() //在标题栏中显示加载
  wx.showLoading({
    title: '刷新中...',
  })
  wx.p.request({
    url:'http://localhost:3000/api/check/allpic',
    method:'POST',
  }).then(res =>{
    let swiperList = res.data.data
    for(let item of swiperList){
      item.url = item.url.replace(/\\/g,'/')
    }
    this.setData({
      swiperList
    })
    return wx.p.request({
      method:'POST',
      url: 'http://localhost:3000/api/check/allnotice',
    }).then(res =>{
       this.setData({
         noticeList:res.data.data
       })
    wx.hideLoading()//完成停止加载框
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh()//停止下拉刷新
    })
   
  }).catch(err =>{
    wx.showToast({
      title: '获取首页信息失败，请重新刷新页面',
      icon: 'error',
      duration: 1000
    })
  })
},

})