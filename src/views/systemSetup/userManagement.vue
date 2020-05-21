<template>
  <el-container class="wrapper">
    <el-aside>
      <el-tree :data="data" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <el-main>
      <table-header :form-option="searchFormOption" @search="handleFilter" />
      <el-row />
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
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </base-table>
      <base-form ref="baseForm" :form-option="formOption" :is-reset-form-flag="isResetFormFlag" :parent-instance="this" @updateData="updateData" @createData="createData" />
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
import TableHeader from '@/components/tableHeader'
import BaseTable from '@/components/baseTable'
import BaseForm from '@/components/baseForm'
import { getTreeData } from '@/api/treeData'
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
        title: '',
        operationStatus: '',
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
          }
        ],
        rules: {
          id: [{ required: true, message: '请输入id', trigger: 'blur' }]
        }
      },
      tableData: [
        {
          userName: 'lyyhadmin',
          name: '临沂钰弘',
          telephone: '',
          mobilePhone: '',
          belongCompany: '临沂钰弘科技',
          department: '临沂钰弘科技'
        }
      ],
      tableConfig: [
        {
          prop: 'userName',
          label: '登录名',
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
          prop: 'telephone',
          label: '电话',
          align: 'center',
          width: ''
        },
        {
          prop: 'mobilePhone',
          label: '手机',
          align: 'center',
          width: ''
        },
        {
          prop: 'belongCompany',
          label: '归属公司',
          align: 'center',
          width: ''
        },
        {
          prop: 'department',
          label: '归属部门',
          align: 'center',
          width: ''
        }
      ],
      searchFormOption: {
        config: [
          {
            type: 'text',
            label: '归属公司：',
            name: 'belongCompany',
            placeholder: '请输入公司名称'
          },
          {
            type: 'text',
            label: '登录名：',
            name: 'loginName',
            placeholder: '请输入登录名'
          },
          {
            type: 'text',
            label: '姓名',
            name: 'name',
            placeholder: '请输入姓名'
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
    // 获取树形结构数据(传入)
    getTreeData() {
      return new Promise((resolve, reject) => {
        getTreeData().then(response => {
          if (response.code === 20000) {
            const data = response.data
            resolve(data)
          } else {
            reject(response.code)
          }
        })
      })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    // 查询函数
    handleFilter(listQuery) {
      console.log(listQuery)
    },
    // 新增用户
    handleCreate() {
      const title = '新增用户'
      const operationStatus = 'create'
      this.formAction(title, operationStatus)
    },
    // 查看用户信息
    handleView(row) {
      const title = '查看用户'
      const operationStatus = 'view'
      this.formAction(title, operationStatus, row)
    },
    // 编辑用户信息
    handleEdit(row) {
      const title = '修改用户'
      const operationStatus = 'edit'
      this.formAction(title, operationStatus, row)
    },
    // 删除用户信息
    handleDelete() {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 表单操作
    formAction(title, operationStatus, data) {
      this.formOption.title = title
      this.formOption.operationStatus = operationStatus
      this.formOption.data = data
      this.isResetFormFlag = !this.isResetFormFlag
      this.$refs.baseForm.show()
    },
    // 更新数据
    updateData(data) {
      console.log(data)
    },
    // 新增数据
    createData(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
</style>
