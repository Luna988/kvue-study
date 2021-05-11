// 给obj定义一个响应式属性
function defineReactive(obj,key,val){
  // 递归
  // val如果是个对象，就需要递归处理
  observe(val)
  Object.defineProperty(obj,key,{
    get(){
      console.log('get',key)
      return val
    },
    set(newVal){
      if(newVal !== val){
        console.log('set',key)
        val = newVal
        // 新值如果是对象，仍需要响应式处理
        observe(newVal)
      }
    }
  })
}

function observe(obj){
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  Object.keys(obj).forEach(key => defineReactive(obj,key,obj[key]))
}

function set(obj,key,val){
  defineReactive(obj,key,val)
}


const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    n: 1111
  }

}

observe(obj)
// obj.bar
// obj.baz.n
// obj.baz = {
//   m: '111'
// }
// obj.baz.m
// obj.dong = 'dq'

set(obj,'dong','dong111')
obj.dong