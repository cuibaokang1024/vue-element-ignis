<template>
  <el-dialog :visible.sync="dialogTreeVisible" :append-to-body="true" width="300px">
    <div slot="title" class="dialog-title">{{ title }}</div>
    <div class="dialog-content">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide()">取 消</el-button>
      <el-button type="primary" @click="submitData()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  name: 'SelectTree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    },
    model: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      dialogTreeVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectData: ''
    }
  },
  methods: {
    hide() {
      this.dialogTreeVisible = false
    },
    show() {
      this.dialogTreeVisible = true
    },
    handleNodeClick(data) {
      this.selectData = data.label
      console.log(this.selectData)
    },
    submitData() {
      this.$emit('selectTreeNode', this.selectData)
      this.hide()
    }
  }
}
</script>

<style scoped>
  .dialog-content{
    height: 150px;
    overflow-y: auto;
  }
</style>
