// pages/map/map.js
Page({
  data:{
  skew: 0,
  rotate: 0,
  showLocation: true, //是否显示当前定位
  showScale: false,  //
  subKey: 'ISVBZ-YH46X-5LP4Q-ZHXYS-DVMEK-4LBDB', 
  layerStyle: 1,  //
  enableZoom: true,  //是否可以方=放大缩小
  enableScroll: true,  // 是否可以滚动
  enableRotate: false,  //是否可以旋转
  showCompass: false,  //
  enable3D: false,  //3D地址
  enableOverlooking: false,  //是否是俯视视角
  enableSatellite: false,  // 是否启动卫星影像
  enableTraffic: false,  // 是否显示交通流量
  drawPolygon:false,  //
  latitude:'21.872946',  //  纬度
  longitude:'111.963505',  //经度  
  markers:[
    {
       'id':1,
       'name':'德信华城一栋101物业管理处',
       'latitude':'21.867678',
       'longitude':'111.952903',
       'iconPath':'',
       'width':32,
       'height':32
  }
],  // 特殊位置 
  circles:[],  //  点
  polylines:[],  //线
  polygons:[],  //面
  showDialog: false,
  currentMarker:null,
  showActionsheet:true,
  groups: [
    {sex:'前往导航'},
  ],
},
  onReady(){
    const map = wx.createMapContext("map")
    map.moveToLocation()
  },
  handleMarkerTap(e){
    const marker = this.data.markers.find(item =>item.id == e.detail.markerId);
      this.setData({
        currentMarker: marker,
        showActionsheet:false
      })
},
actionsheetChange(){
  this.setData({showActionsheet:true});
},
itemTap(){
  let plugin = requirePlugin('routePlan')
  let key = 'ISVBZ-YH46X-5LP4Q-ZHXYS-DVMEK-4LBDB'
  let referer =' wx50b5593e81dd937a' 
  let endPoint = JSON.stringify({
    'name':this.data.currentMarker.name,
    'latitude':this.data.currentMarker.latitude,
    'longitude':this.data.currentMarker.longitude
  })
  wx.navigateTo({
    url: 'plugin://routePlan/index?key=' +key+ '&referer='+referer+ '&endPoint=' +endPoint
  })
},
})