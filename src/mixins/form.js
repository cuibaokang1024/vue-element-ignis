export default {
  data() {
    return {
      isResetFormFlag: false,
      formOption: {
        title: '',
        operationStatus: '',
        data: [],
        config: [],
        rules: {}
      }
    }
  },
  methods: {
    // 新增表单数据
    handleCreate(title) {
      const operationStatus = 'create'
      this.formAction(title, operationStatus)
    },
    // 查看表单信息
    handleView(data, title) {
      const operationStatus = 'view'
      this.formAction(title, operationStatus, data)
    },
    // 编辑表单信息
    handleEdit(data, title) {
      const operationStatus = 'edit'
      this.formAction(title, operationStatus, data)
    },
    // 删除表单数据
    handleDelete() {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData()
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
    }
  }
}
