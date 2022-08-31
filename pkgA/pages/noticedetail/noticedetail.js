// pkgA/pages/noticedetail/noticedetail.js
Page({
  data:{
    headline:'',
    content:'',
    createdAt:''
  },
  onLoad(options){
    let {headline,content,createdAt} = options;
    this.setData({
      headline,
      content,
      createdAt
    })
  }
})