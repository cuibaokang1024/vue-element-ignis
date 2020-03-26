import request from '@/utils/request'

export function getTreeData() {
  return request({
    url: '/treeData',
    method: 'get'
  })
}
