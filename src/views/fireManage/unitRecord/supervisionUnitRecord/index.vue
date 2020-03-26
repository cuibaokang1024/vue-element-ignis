<template>
  <div class="app-container">
    <table-header :form-option="searchFormOption" @search="handleFilter" />
    <div class="left" />
    <div class="content">
      <base-table :loading="listLoading" :table-data="tableData" :table-config="tableConfig">
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleView(row)">查看</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleate(row)"
            >删除</el-button>
            <el-button
              size="mini"
              style="width: auto"
              type="warning"
              @click="viewUnitRecord(row)"
            >单位档案</el-button>
            <el-button
              size="mini"
              style="width: auto"
              type="warning"
              @click="viewDevInfo(row)"
            >设备详情</el-button>
            <el-button
              size="mini"
              style="width: auto"
              type="warning"
              @click="viewDevList(row)"
            >设备列表</el-button>
          </template>
        </el-table-column>
      </base-table>
      <base-form ref="baseForm" :form-option="formOption" :is-reset-form-flag="isResetFormFlag" @submit="submitForm">
        <template v-slot:addFile>
          <add-file ref="fileUpload" :active-name="activeName" :tab-map-options="tabMapOptions" :file-data="fileData" :created-times="createdTimes" @uploadCompleted="uploadCompleted" />
        </template>
      </base-form>
      <dev-info ref="devInfo" />
      <dev-list ref="devList" />
      <unit-file ref="unitFile" />
    </div>
  </div>
</template>

<script type="text/javascript">
import TableHeader from '@/components/tableHeader'
import BaseTable from '@/components/baseTable'
import BaseForm from '@/components/baseForm'
import UnitFile from '@/components/unitFile'
import AddFile from '@/components/addFile'
import DevInfo from '@/components/devInfo'
import DevList from '@/components/devList'
import { getTreeData } from '@/api/treeData'
export default {
  name: 'SupervisionUnitRecord',
  components: {
    TableHeader,
    BaseTable,
    BaseForm,
    UnitFile,
    AddFile,
    DevInfo,
    DevList
  },
  data() {
    return {
      listLoading: false,
      isResetFormFlag: false,
      parentMenuData: [],
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableConfig: [
        {
          prop: 'id',
          label: 'ID',
          align: 'center',
          width: ''
        },
        {
          prop: 'date',
          label: '时间',
          align: 'center',
          width: ''
        },
        {
          prop: 'name',
          label: '姓名',
          align: 'center',
          width: ''
        },
        {
          prop: 'address',
          label: '地址',
          align: 'center',
          width: ''
        }
      ],
      searchFormOption: {
        config: [
          {
            type: 'text',
            label: '姓名',
            name: 'name',
            placeholder: '请输入名称'
          },
          {
            type: 'text',
            label: 'id',
            name: 'id',
            placeholder: '请输入id'
          },
          {
            type: 'select',
            label: '类型',
            name: 'type',
            placeholder: '请选择类型',
            dataList: [
              {
                index: 1,
                text: '1'
              },
              {
                index: 2,
                text: '2'
              },
              {
                index: 3,
                text: '3'
              }
            ]
          },
          {
            type: 'treeSelect',
            label: '单位',
            name: 'unit',
            treeTitle: '请选择单位',
            treeData: [
              {
                label: '一级 1',
                children: [
                  {
                    label: '二级 1-1',
                    children: [
                      {
                        label: '三级 1-1-1'
                      }
                    ]
                  }
                ]
              },
              {
                label: '一级 2',
                children: [
                  {
                    label: '二级 2-1',
                    children: [
                      {
                        label: '三级 2-1-1'
                      }
                    ]
                  },
                  {
                    label: '二级 2-2',
                    children: [
                      {
                        label: '三级 2-2-1'
                      }
                    ]
                  }
                ]
              },
              {
                label: '一级 3',
                children: [
                  {
                    label: '二级 3-1',
                    children: [
                      {
                        label: '三级 3-1-1'
                      }
                    ]
                  },
                  {
                    label: '二级 3-2',
                    children: [
                      {
                        label: '三级 3-2-1'
                      }
                    ]
                  }
                ]
              }
            ],
            placeholder: '请选择单位'
          },
          {
            type: 'treeSelect',
            label: '机构',
            name: 'mechanism',
            treeTitle: '请选择机构',
            treeData: {
              data: [
                {
                  label: '一级 1',
                  children: [
                    {
                      label: '二级 1-1',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: '一级 2',
                  children: [
                    {
                      label: '二级 2-1',
                      children: [
                        {
                          label: '三级 2-1-1'
                        }
                      ]
                    },
                    {
                      label: '二级 2-2',
                      children: [
                        {
                          label: '三级 2-2-1'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: '一级 3',
                  children: [
                    {
                      label: '二级 3-1',
                      children: [
                        {
                          label: '三级 3-1-1'
                        }
                      ]
                    },
                    {
                      label: '二级 3-2',
                      children: [
                        {
                          label: '三级 3-2-1'
                        }
                      ]
                    }
                  ]
                }
              ],
              title: '选择菜单',
              style: 'width: 161px',
              model: 'mechanism'
            },
            placeholder: '请选择机构'
          }
        ]
      },
      formOption: {
        title: '新增菜单',
        name: 'editMenu',
        data: [],
        config: [
          {
            label: 'Id',
            name: 'id',
            type: 'text'
          },
          {
            label: '时间',
            name: 'date',
            type: 'date'
          },
          {
            label: '姓名',
            name: 'name',
            type: 'text'
          },
          {
            label: '地址',
            name: 'address',
            type: 'text'
          },
          {
            label: '上级菜单',
            name: 'parentMenu',
            type: 'treeSelect',
            treeData: {
              data: [],
              title: '选择菜单',
              style: 'width: 161px',
              model: 'parentMenu'
            }
          },
          {
            type: 'select',
            label: '类型',
            name: 'type',
            dataList: [
              {
                index: 1,
                text: '业务部'
              },
              {
                index: 2,
                text: '研发部'
              }
            ]
          },
          {
            type: 'slot',
            name: 'addFile'
          }
        ],
        rules: {
          id: [{ required: true, message: '请输入Id', trigger: 'blur' }]
        }
      },
      fileData: {
        LegalFile: [
          {
            id: 0,
            fileList: [
              {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
              },
              {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
              }
            ],
            fileName: '平面图1'
          }
        ]
      },
      tabMapOptions: [
        {
          label: '消防合法文书',
          key: 'LegalFile'
        }
      ],
      activeName: 'LegalFile',
      createdTimes: 0,
      uploadList: []
    }
  },
  watch: {
    fileData(newV, oldV) {
      console.log(newV)
    }
  },
  created() {
    this._getParentMneu()
  },
  methods: {
    _getParentMneu() {
      const index = this.formOption.config.findIndex((item, index) => {
        if (item.name === 'parentMenu') {
          return index
        }
      })
      getTreeData().then((response) => {
        if (response.code === 20000) {
          this.formOption.config[index].treeData.data = response.data
        }
      })
    },
    submitForm(data) {
      console.log(data)
      console.log(this.uploadList)
      this.uploadList = []
    },
    handleFilter(listQuery) {
      console.log(listQuery)
    },
    handleView(row) {
      console.log(row)
      this.formOption.name = 'viewMenu'
      this.formOption.data = row
      this.isResetFormFlag = !this.isResetFormFlag
      console.log(this.isResetFormFlag)
      this.$refs.baseForm.show()
    },
    handleEdit(row) {
      this.formOption.name = 'editMenu'
      this.formOption.data = row
      this.isResetFormFlag = !this.isResetFormFlag
      this.$refs.baseForm.show()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    viewUnitRecord(row) {
      this.$refs.unitFile.show()
    },
    viewDevInfo() {
      this.$refs.devInfo.show()
    },
    viewDevList() {
      this.$refs.devList.show()
    },
    uploadCompleted(fileInfo, index) {
      const fileItem = {
        id: index,
        fileList: fileInfo
      }
      this.uploadList.push(fileItem)
    }
  }
}
</script>

<style scoped>
</style>
