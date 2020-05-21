<template>
  <el-dialog :title="formOption.title" :modal-append-to-body="false" :visible.sync="dialogVisible" width="800px">
    <div slot="title" class="dialog-title">{{ formOption.title }}</div>
    <div ref="content" class="dialog-content">
      <el-form ref="form" :inline="true" :rules="formOption.rules" :disabled="disabled" :model="formModel" label-width="80px">
        <form-items ref="formItems" :form-model.sync="formModel" :form-config="formOption.config" @showSelectTree="showSelectTree">
          <template v-slot:slot>
            <slot v-for="item in slotList" :name="item.name" />
          </template>
        </form-items>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide()">关 闭</el-button>
      <el-button v-if="showConfirm" type="primary" @click="formOption.operationStatus==='create'?createData():updateData()">确 定</el-button>
    </div>
    <select-tree ref="selectTree" :tree-data="treeData.data" :title="treeData.title" @selectTreeNode="selectTreeNode" />
  </el-dialog>
</template>

<script>
import FormItems from './formItems'
import SelectTree from '@/components/selectTree'
export default {
  components: {
    FormItems,
    SelectTree
  },
  props: {
    // 表单配置项
    formOption: {
      type: Object,
      default: () => {}
    },
    // 是否更新表单数据
    isResetFormFlag: {
      type: Boolean,
      default: false
    },
    parentInstance: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      treeData: {},
      formModel: {}
    }
  },
  computed: {
    // 是否可编辑
    disabled() {
      return this.formOption.operationStatus.indexOf('view') !== -1
    },
    // 是否显示确认按钮
    showConfirm() {
      return this.formOption.operationStatus !== 'view'
    },
    // 自定义插槽
    slotList() {
      return this.formOption.config.filter((item, index) => {
        return item.type === 'slot'
      })
    }
  },
  watch: {
    isResetFormFlag() {
      this.formModelProcess()
    }
  },
  // mounted() {
  //   this.formModelProcess()
  // },
  methods: {
    formModelProcess() {
      const formObj = {}
      if (!this.formOption.data) {
        return
      }
      this.formOption.config.forEach((e) => {
        const nameVal = e.name
        if (!nameVal) {
          console.error('[oa form warn]: 存在未配置name或者name为空的表单项')
          return
        }
        formObj[nameVal] = this.checkValue(this.formOption.data[nameVal]) ? this.formOption.data[nameVal] : this.getItemDefaultValue(e)
      })
      this.formModel = Object.assign({}, formObj)
      console.log(this.formModel)
    },
    // 值为空判断
    checkValue(val) {
      return val || val === 0
    },
    // 默认值
    getItemDefaultValue(item) {
      return item.value ? item.value : item.type === 'checkbox' ? [] : ''
    },
    hide() {
      this.dialogVisible = false
    },
    show() {
      this.dialogVisible = true
      // 清空校验
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 调用父组件方法获取树形结构数据，并显示。
    async showSelectTree(treeData) {
      try {
        const dataList = await this.parentInstance.getTreeData(treeData.model)
        this.treeData = Object.assign(treeData, { data: dataList })
        this.$refs.selectTree.show()
      } catch (e) {
        console.log(e)
      }
    },
    selectTreeNode(selectData) {
      this.formModel[this.treeData.model] = selectData
    },
    // 新增表单数据
    createData() {
      this.submitData('createData')
    },
    // 更新表单数据
    updateData() {
      this.submitData('updateData')
    },
    submitData(operationName) {
      this.$refs.formItems.submitData()
      const data = Object.assign({}, this.formModel)
      // 表单校验
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit(operationName, data)
          this.hide()
        } else {
          return
        }
      })
    }
  }
}
</script>

<style>
</style>
