// pages/collection/collection.js
Page({
  data:{
    msgList: [
      { url: '', title: "新闻：春天两会的“心语新愿”" },
      { url: '', title: "防疫：保持警惕，做好防疫措施" },
      { url: '', title: "提醒：午睡20至30分钟最好" }
    ]
  },

  btnToPay(){
    wx.navigateTo({
      url: '/pages/collection/views/pay/pay',
    })
  },
  btnToRepairs(){
    wx.navigateTo({
      url: '/pages/collection/views/repairs/repairs',
    })
  },
  btnToComplaint(){
    wx.navigateTo({
      url: '/pages/collection/views/complaint/complaint',
    })
  },
  btnToSuggestion(){
    wx.navigateTo({
      url: '/pages/collection/views/suggestion/suggestion',
    })
  },
  btnToPark(){
    wx.navigateTo({
      url: '/pages/collection/views/park/park',
    })
  },
  btnToNotice(){
    wx.navigateTo({
      url: '/pages/collection/views/notice/notice',
    })
  }
})