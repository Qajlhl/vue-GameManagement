import axios from 'axios';
import {Notification } from 'element-ui';
import router from '../router';

// 创建一个axios实例，并同时配置相关信息
const service = axios.create({
  baseURL: '/api/v1', // 配置基础访问地址，会和传入地址合并
  timeout: 5000, // 超时时间 单位ms
});

// 配置请求拦截器，可以在请求发送之前做一些事情
service.interceptors.request.use(
  (config) => {
    // 后台是通过token信息来验证身份的
    // 后台中请求头为 Authorization，值为 'Bearer ' + token
    const token = sessionStorage.getItem('token');
    if(token){
      //请求头用于携带token信息
      //'Bearer '  单词bearer后面一定要加一个空格！！
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);
// 配置相应拦截器，可以在数据响应之前做一些事情
service.interceptors.response.use(
  (response) => {
    // 获取后台响应的数据
    const data = response.data;
    if(data.code == 401){
      Notification.error({
        title:'提示',
        message:'尚未登录或者登录超时',
        duration:2000,
      })
      router.push('/login');
    }
    return response;
    // if (response.status === 200) {
    //   return response.data;
    // } else {
    //   Promise.reject();
    // }
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
