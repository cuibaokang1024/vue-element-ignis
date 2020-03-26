import Layout from '@/layout'
const map = {
  layout: Layout,
  menuManagement: () => import('@/views/systemSetup/menuManagement'),
  userManagement: () => import('@/views/systemSetup/userManagement'),
  lowerGovernment: () => import('@/views/systemSetup/lowerGovernment'),
  pagePermission: () => import('@/views/permission/page'),
  directivePermission: () => import('@/views/permission/directive'),
  rolePermission: () => import('@/views/permission/role'),
  icons: () => import('@/views/icons/index'),
  tinymce: () => import('@/views/components-demo/tinymce'),
  markdown: () => import('@/views/components-demo/markdown'),
  jsonEditor: () => import('@/views/components-demo/json-editor'),
  splitPane: () => import('@/views/components-demo/split-pane'),
  avatarUpload: () => import('@/views/components-demo/avatar-upload'),
  dropZone: () => import('@/views/components-demo/dropzone'),
  sticky: () => import('@/views/components-demo/sticky'),
  countTo: () => import('@/views/components-demo/count-to'),
  mixin: () => import('@/views/components-demo/mixin'),
  backToTop: () => import('@/views/components-demo/back-to-top'),
  dragDialog: () => import('@/views/components-demo/drag-dialog'),
  dragSelect: () => import('@/views/components-demo/drag-select'),
  dndList: () => import('@/views/components-demo/dnd-list'),
  dragKanban: () => import('@/views/components-demo/drag-kanban'),
  keyboard: () => import('@/views/charts/keyboard'),
  lineChart: () => import('@/views/charts/line'),
  mixChart: () => import('@/views/charts/mix-chart'),
  dynamicTable: () => import('@/views/table/dynamic-table/index'),
  dragTable: () => import('@/views/table/drag-table'),
  inlineEditTable: () => import('@/views/table/inline-edit-table'),
  complexTable: () => import('@/views/table/complex-table'),
  createArticle: () => import('@/views/example/create'),
  editArticle: () => import('@/views/example/edit'),
  articleList: () => import('@/views/example/list'),
  tab: () => import('@/views/tab/index'),
  page401: () => import('@/views/error-page/401'),
  page404: () => import('@/views/error-page/404'),
  menu1: () => import('@/views/nested/menu1/index'),
  'menu1-1': () => import('@/views/nested/menu1/menu1-1'),
  'menu1-2': () => import('@/views/nested/menu1/menu1-2'),
  'menu1-2-1': () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  'menu1-2-2': () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  'menu1-3': () => import('@/views/nested/menu1/menu1-3'),
  menu2: () => import('@/views/nested/menu2/index'),
  PDF: () => import('@/views/pdf/index'),
  pdfDownload: () => import('@/views/pdf/download'),
  exportExcel: () => import('@/views/excel/export-excel'),
  selectExcel: () => import('@/views/excel/select-excel'),
  mergeHeader: () => import('@/views/excel/merge-header'),
  uploadExcel: () => import('@/views/excel/upload-excel'),
  Theme: () => import('@/views/theme/index'),
  ClipboardDemo: () => import('@/views/clipboard/index'),
  integratedReport: () => import('@/views/bigData/integratedReport'),
  industryDirectors: () => import('@/views/bigData/integratedReport/administrativeDivision'),
  administrativeDivision: () => import('@/views/bigData/integratedReport/administrativeDivision'),
  drawMap: () => import('@/views/bigData/drawMap'),
  unitRecord: () => import('@/views/fireManage/unitRecord'),
  supervisionUnitRecord: () => import('@/views/fireManage/unitRecord/supervisionUnitRecord'),
  notice: () => import('@/views/fireManage/notice')

}
export default function mapRouter(data) {
  data.forEach((item, index) => {
    item.component = map[item.component]
    if (item.children) {
      mapRouter(item.children)
    }
  })
  return data
}
