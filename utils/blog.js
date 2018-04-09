import { showLoading, hideLoading } from './wechat.js';

const URI = 'https://api.it120.cc/choui/api/transmit'
const fetch = require('./fetch')


function fetchApi(type, params) {
  return  showLoading({title:'loading'}).then(()=>{
    return fetch(URI, type, params)
  }).then(result => {
    hideLoading();
    return result;
  });
}

function interceptor(res) {
  res = res.data;
  if (res.code === 0 && res.data) {
    if (res.data.status !== '0') { //我的接口出错 
      // showZanToast('出错了')
      return { 'msg': res.data.desc }
    } else {
      return res.data.data
    }
  } else {// api工厂出错 
    return { 'msg': res.msg }
  }
}


function getArticles(pageIndex = 1, pageSize = 10, tag = '') {
  return fetchApi('393', { pageIndex, pageSize, tag })
    .then(interceptor);
}

function getTags() {
  const params = {}
  return fetchApi('403', params)
    .then(interceptor)
}



module.exports = { getArticles, getTags }