import {request,request1} from './request'

export function getHomeMultiData() {
  return request({
    url:'/home/multidata'
  });
}

export function getGoodsData(type, page) {
  return request1({
    url:'/home/data',
    params:{
      type,
      page
    }
  });
}
