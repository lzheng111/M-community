// index.js

// 获取应用实例
const app = getApp()
// import {createStoreBindings} from 'mobx-miniprogram-bindings'
// import{store} from '../../store/store'
Page({
  data: {
  },
  formSubmit(e){
    wx.p.request({
      method:'POST',
      url: 'http://localhost:3000/api/user/login/user',
      data:{
        tel:e.detail.value.tel,
        password:e.detail.value.password
      }
    }).then(res =>{
      if(res.data.errno === 0){
        wx.setStorage({
          key:"user",
          data:res.data.data
      })
      wx.switchTab({
        url: '/pages/home/home',
      }) 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      })
      }else{
        wx.showToast({
          title: '账号或密码错误',
          icon: 'error',
          duration: 1000
        })
      }
     
    }).catch(err =>{
      wx.showToast({
        title: '账号或密码错误',
        icon: 'error',
        duration: 1000
      })
    }) 
  },

 
 
})
