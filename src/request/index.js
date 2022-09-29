import axios from "axios";

let service = axios.create({
    baseURL:"https://gateway-api.dushu365.com",
    timeout:5000,
    headers:{
        "Content-Type": "application/json; charset=utf-8",
        "X-DUSHU-APP-ONEID": "OI0uTq0uVGsr7WSQO9ya76xA-HJhOiVrP2u5GZjJvtOn8", 
        "X-DUSHU-APP-VER": "5.20.0",
        "X-DUSHU-APP-LID": "T8cwcyT7yd7JGfN0EulaM2MvcO-rgrsq",
        "X-DUSHU-APP-PLT": "1",
        "X-DUSHU-APP-MUID": "00000000-0000-0000-0000-000000000000",
    }
})
//请求拦截器  
//axios实例的拦截器的request请求使用配置对象，返回配置对象
service.interceptors.request.use((config)=>{
    //请求成功的返回配置对象
    return config
  },(error)=>{
    //请求失败的返回，后面的then或者catch回调随便写不写
    return Promise.reject(error)
  })
  
  //响应拦截器
  service.interceptors.response.use((response)=>{
    //响应成功的返回
    return response.data
  },(error)=>{
    //响应失败的返回
    return Promise.reject(error)
  })
  
export default service;