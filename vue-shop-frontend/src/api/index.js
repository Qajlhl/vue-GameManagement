import request from '../utils/request';

export const fetchData = (query) => {
  return request({
    url: './table.json',
    method: 'get',
    params: query,
  });
};

// 用户登录
// 参数 user = {"username": "admin","password": "123456"}
export const login = (user) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: user,
  });
};

export const getRole = () => {
  return request({
    url: '/role/list/all',
    method: 'get',
  });
};

export const getDept = () => {
  return request({
    url: '/dept/list/all',
    method: 'get',
  });
};

export const getUser = () => {
  return request({
    url: '/user/list/all',
    method: 'get',
  });
};

export const updateUser = (newUser) => {
  return request({
    url: '/user/update',
    method: 'put',
    data:newUser,
  });
};

export const insertUser = (newUser) => {
  return request({
    url: '/user/insert',
    method: 'put',
    data:newUser,
  });
};

export const userPage = (params) => {
  return request({
    url: '/user/list/page',
    params,
  });
};

export const DeleteUser = (id) => {
  return request({
    url: '/user/id/'+id,
    method:'delete',
  });
};

export const findUser = (id) => {
  return request({
    url:  `/user/find/id/${id}`,
  });
};





