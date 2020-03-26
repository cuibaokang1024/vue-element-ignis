<template>
  <el-dialog :title="formOption.title" :modal-append-to-body="false" :visible.sync="dialogVisible" width="800px">
    <div slot="title" class="dialog-title">{{ formOption.title }}</div>
    <div ref="content" class="dialog-content">
      <el-form :inline="true" :rules="formOption.rules" :model="formModel" label-width="80px">
        <form-items ref="formItems" :form-model.sync="formModel" :form-config="formOption.config" @showSelectTree="showSelectTree">
          <template v-slot:slot>
            <slot v-for="item in slotList" :name="item.name" />
          </template>
        </form-items>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide()">取 消</el-button>
      <el-button type="primary" @click="submitData()">确 定</el-button>
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
    isResetFormFlag: {
      type: Boolean,
      default: false
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
    },
    showSelectTree(treeData) {
      this.treeData = treeData
      this.$refs.selectTree.show()
    },
    selectTreeNode(selectData) {
      this.formModel[this.treeData.model] = selectData
    },
    submitData() {
      this.$refs.formItems.submitData()
      const data = Object.assign({}, this.formModel)
      this.$emit('submit', data)
      this.hide()
    }
  }
}
</script>

<style>
</style>
