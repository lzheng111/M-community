// pages/login/login.js
Page({
  login(){
    wx.getUserProfile({
      desc: '必须授权才能登录',
      success(res){
        wx.setStorageSync('userPic', res.userInfo.avatarUrl)     
    }
  })
}, 
getPhoneNumber (e) {
  let{encryptedData,iv} = e.detail
  let appid ="wxf8153915adf874c4"
  let secret = "ef0ba8633ba8814d65c8ce9e357a40e9"
      wx.login({
        success(res){
         let code = res.code  //登录凭证
         wx.p.request({
           method:'GET',
           url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
         }).then(res =>{
           let session_key = res.data.session_key;  //本次登录的会话密钥
           return  wx.p.request({
               url: 'http://localhost:3000/api/user/getusertel',
               method:'POST',
               data:{
                encryptedData:encryptedData,
                iv: iv,
                appid:appid,
                secret:secret,
                code:code,
                session_key:session_key
               },
             }).then(res =>{
               let tel =res.data.value.phoneNumber
               return wx.p.request({
                 method:'POST',
                 url:'http://localhost:3000/api/user/check/user',
                 data:{
                   tel
                 }
               }).then(res =>{
                 wx.setStorageSync('userInfo', res.data.data);
                 wx.switchTab({
                  url: '/pages/home/home',
                }) 
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1000
                })
               })
             }).catch(err =>{
               console.log(err);
             })
         })
        }
      })
}
})