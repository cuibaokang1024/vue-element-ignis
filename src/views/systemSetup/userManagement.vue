<template>
  <el-container class="wrapper">
    <el-aside>
      <el-tree :data="data" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <el-main>
      <table-header :form-option="searchFormOption" @search="handleFilter" />
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
          </template>
        </el-table-column>
      </base-table>
      <base-form ref="baseForm" :form-option="formOption" :is-reset-form-flag="isResetFormFlag" @submit="submitForm" />
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
import TableHeader from '@/components/tableHeader'
import BaseTable from '@/components/baseTable'
import BaseForm from '@/components/baseForm'
export default {
  name: 'UserManagement',
  components: {
    TableHeader,
    BaseTable,
    BaseForm
  },
  data() {
    return {
      listLoading: false,
      formShow: false,
      isResetFormFlag: false,
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
          }
        ],
        rules: {
          id: [{ required: true, message: '请输入id', trigger: 'blur' }]
        }
      },
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
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
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    submitForm(data) {
      console.log(data)
    },
    formHide() {
      this.formShow = false
    },
    handleFilter(listQuery) {
      console.log(listQuery)
    },
    showForm() {
      return new Promise(resolve => {
        this.formShow = true
        resolve()
      })
    },
    handleView(row) {
      this.formOption.name = 'viewMenu'
      this.formOption.data = row
      this.isResetFormFlag = !this.isResetFormFlag
      this.$refs.baseForm.show()
    },
    handleEdit(row) {
      this.formOption.name = 'editMenu'
      this.formOption.data = row
      this.isResetFormFlag = !this.isResetFormFlag
      this.$refs.baseForm.show()
    }
  }
}
</script>

<style scoped>
</style>
