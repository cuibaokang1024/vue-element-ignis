import request from '@/utils/request'

export function getMapList() {
  return request({
    url: '/map',
    method: 'get'
  })
}
