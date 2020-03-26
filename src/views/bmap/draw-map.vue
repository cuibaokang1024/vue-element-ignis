<template>
  <div>
    <baidu-map
      :map-click="false"
      @mousemove="syncPolygon"
      @ready="handler"
      @click="paintPolygon"
      @rightclick="newPolygon"
    >
      <bm-boundary ref="boundarys" name="济宁市" :stroke-weight="2" stroke-color="blue" @click="showInfoWindow" />
      <bm-info-window
        :position="infoWindow.position"
        :auto-pan="infoWindow.autoPan"
        title="济宁市"
        :show="infoWindow.show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p v-text="infoWindow.contents" />
      </bm-info-window>
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
      <div class="bm-control">
        <button @click="toggle('polygonPath')">{{ polygonPath.editing ? '停止绘制' : '开始ds绘制' }}</button>
      </div>
    </baidu-map>
  </div>
</template>

<script>
import { getMapList } from '@/api/bMap'
export default {
  name: 'BaseMap',
  data() {
    return {
      mapList: [],
      map: {},
      zoom: 9,
      center: '',
      infoWindow: {
        // 弹出框信息配置
        show: false,
        autoPan: true,
        position: {},
        contents: '青岛市'
      },
      polygonPath: {
        editing: false,
        paths: [] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
      }
    }
  },
  created: function() {
    this._getMapList()
  },
  mounted: function() {
    console.log(this.$refs.boundarys)
  },
  methods: {
    // 获取地图相关数据
    _getMapList() {
      getMapList().then(response => {
        if (response.code === 20000) {
          this.mapList = this.filterMaplist(response.data)
        }
      })
    },
    // 筛选符合当前地图层级的数据
    filterMaplist(list) {
      return list.filter((item) => {
        return (item.minLevel <= this.zoom && item.maxLevel >= this.zoom)
      })
    },
    // 初始化百度地图中心点，层级
    handler({ BMap, map }) {
      this.map = map
      map.enableScrollWheelZoom(true)
      map.centerAndZoom('青岛市', 10)
    },
    // 点击行政区划弹出信息框
    showInfoWindow(e) {
      this.infoWindowOpen()
      this.infoWindow.position = e.point
      this.map.centerAndZoom(e.point, 9)
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
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    // 鼠标右键多边形绘制完成
    paintPolygon(e) {
      if (!this.polygonPath.editing) {
        return
      }
      console.log(this.polygonPath.paths)
      const { paths } = this.polygonPath
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.control{
  width: 100px;
  background: #1890ff;
  button{
    color: #FFFFFF;
    background-color: #1890ff;
    border-color: #1890ff;
  }
}
</style>

