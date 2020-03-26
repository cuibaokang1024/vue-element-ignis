import request from '@/utils/request'

export function getRouteList() {
  return request({
    url: '/route',
    method: 'get'
  })
}
