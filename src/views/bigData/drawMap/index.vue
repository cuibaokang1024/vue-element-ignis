<template>
  <div class="map-wrapper">
    <baidu-map
      class="map-content"
      :map-click="false"
      @mousemove="syncPolygon"
      @ready="handler"
      @click="paintPolygon"
      @dblclick="newPolygon"
      @rightclick="newPolygon"
    >
      <bm-polygon
        v-for="path of polygonPath.paths"
        :key="path.toString()"
        :path="path"
        stroke-color="blue"
        fill-color="red"
        :fill-opacity="0.8"
        :stroke-opacity="0.5"
        :stroke-weight="2"
      />
      <bm-control>
        <el-button type="primary" size="mini" @click="toggle('polygonPath')">{{ polygonPath.editing ? '停止绘制' : '开始绘制' }}</el-button>
      </bm-control>
    </baidu-map>
    <base-form ref="areaForm" :form-option="formOption" :is-reset-form-flag="isResetFormFlag" @submit="submitForm" />
  </div>
</template>

<script>
import BaseForm from '@/components/baseForm'
export default {
  name: 'BaseMap',
  components: {
    BaseForm
  },
  data() {
    return {
      mapList: [],
      map: {},
      zoom: 9,
      center: '',
      polygonPath: {
        editing: false,
        paths: [] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
      },
      isResetFormFlag: false,
      formOption: {
        title: '区域设置',
        name: 'editArea',
        data: {
          areaPoint: ''
        },
        config: [
          {
            label: '区域名称',
            name: 'areaName',
            type: 'treeSelect',
            formItemStyle: {
              width: '100%'
            }
          },
          {
            label: '背景色',
            name: 'bgClor',
            type: 'colorSelect'
          },
          // {
          //   label: '区域点',
          //   name: 'areaPoint',
          //   type: 'text'
          // },
          {
            label: '最小层级',
            name: 'minLeave',
            type: 'text'
          },
          {
            label: '最大层级',
            name: 'maxLeave',
            type: 'text'
          },
          {
            label: '内容',
            name: 'content',
            type: 'textarea'
          }
        ],
        rules: {
          id: [{ required: true, message: '请输入Id', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    // 初始化百度地图中心点，层级
    handler({ BMap, map }) {
      this.map = map
      map.enableScrollWheelZoom(true)
      map.centerAndZoom('青岛市', 10)
    },
    // 开启多边形绘制
    toggle(name) {
      this[name].editing = !this[name].editing
      // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
      if (this.polygonPath.paths && this.polygonPath.editing) {
        this.polygonPath.paths = []
      }
    },
    // 鼠标移动时
    syncPolygon(e) {
      if (!this.polygonPath.editing) {
        return
      }
      const { paths } = this.polygonPath
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    // 鼠标左键点击时往路径里push一个点
    newPolygon(e) {
      if (!this.polygonPath.editing) {
        return
      }
      // 当开始绘制后把按钮调回开始绘制状态，防止绘制多个图形
      this['polygonPath'].editing = !this['polygonPath'].editing
      const { paths } = this.polygonPath
      if (!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      // path.pop()
      if (path.length) {
        paths.push([])
      }
      console.log(paths)
      this.$refs.areaForm.show()
      this.isResetFormFlag = !this.isResetFormFlag
    },
    submitForm(data) {
      console.log(data)
      this.polygonPath.paths = []
    },
    // 鼠标右键多边形绘制完成
    paintPolygon(e) {
      if (!this.polygonPath.editing) {
        return
      }
      const { paths } = this.polygonPath
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    }
  }
}
</script>

<style scoped lang="scss">
.map-wrapper{
  position: relative;
  .map-content {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
  el-tooltip{
    position: absolute;
    left: 0;
    top: 0;
  }
}

</style>

