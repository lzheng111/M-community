// pages/map/map.js
Page({
  data:{
    distance:null
  },

  onShow(){
    const that = this
    wx.getLocation({
      type: "wgs84",
      success (res) {
        var La1 = res.latitude * Math.PI / 180.0;
        var La2 = 21.867678 * Math.PI / 180.0;
        var La3 = La1 - La2;
        var Lb3 = res.longitude * Math.PI / 180.0 - 111.969553 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2);
        that.setData({
          distance:s
        })
      }
  })
  },

goToproperty(){
//   wx.openLocation({
//     latitude: 21.867678,
//     longitude: 111.952903,
//     name: "物业管理处",
//     address: "阳江市江城区德信华城1栋101物业处"
// })
  wx.navigateTo({
    url: '/pages/map/map',
  })
},
//下拉刷新
onPullDownRefresh:function()
{
  const that = this
  wx.showNavigationBarLoading() //在标题栏中显示加载
  wx.showLoading({
    title: '刷新中...',
  })
  this.onShow()
  setTimeout(() =>{
    wx.hideLoading()//完成停止加载框
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh()//停止下拉刷新
  },500)
  },
  totel(){
    wx.makePhoneCall({
      phoneNumber: '12345678900' //仅为示例，并非真实的电话号码
    })
  }
})