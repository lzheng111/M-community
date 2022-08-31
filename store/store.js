import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  data:{},
  numA:1,
  numB:2,
  name:'lzh',

  //方法
  setUser:action(function(store,data){
      store.data = data
  }),
  updateNum1:action(function(){
    this.numA ++
  }),
  //计算属性
  get sum(){
    return this.numA+this.numB
  }
})