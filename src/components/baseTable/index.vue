<template>
  <el-table :data="tableData" row-key="id" border>
    <el-table-column v-for="(item,key) in tableConfig" :key="key" :sortable="item.sortable" v-bind="item" />
    <slot />
  </el-table>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Array,
      default: () => []
    }
  }
}
</script>
