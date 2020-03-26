<template>
  <div>
    <baidu-map
      class="map-content"
      :center="center"
      :zoom="zoom"
      :map-style="mapStyle"
      @ready="handler"
      @zoomend="handlerZoom"
    >
      <bmp-polygon
        v-for="list of filterMapList"
        :key="list.id"
        :path="formatPath(list.points)"
        stroke-color="blue"
        :fill-color="list.bgColor"
        :remarks="list.remarks"
        :area-name="list.area.name"
        :fill-opacity="0.8"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        @click="showInfoWindow"
      />
      <bm-info-window
        :position="infoWindow.position"
        :auto-pan="infoWindow.autoPan"
        :title="infoWindow.title"
        :show="infoWindow.show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p v-text="infoWindow.contents" />
      </bm-info-window>

    </baidu-map>
  </div>
</template>

<script>
import { getMapList } from '@/api/bMap'
import BmpPolygon from '@/components/mapPolygon'
export default {
  name: 'BaseMap',
  components: {
    BmpPolygon
  },
  data() {
    return {
      mapList: [],
      filterMapList: [],
      zoom: 9,
      center: '青岛市',
      mapStyle: {

      },
      // 弹出框信息配置
      infoWindow: {
        show: false,
        autoPan: true,
        title: '',
        position: {},
        contents: ''
      }
    }
  },
  created: function() {
    this._getMapList()
  },
  methods: {
    // 获取地图相关数据
    _getMapList() {
      getMapList().then(response => {
        if (response.code === 20000) {
          this.mapList = response.data
        }
      })
    },
    // 筛选符合当前地图层级的数据
    filterMaplist(list, zoom) {
      return list.filter((item) => {
        return (item.minLevel <= zoom && item.maxLevel >= zoom)
      })
    },
    // 格式化path数据
    formatPath(points) {
      const formatPath = []
      const paths = points.split(';')
      paths.forEach((item) => {
        const point = {
          lng: item.split(',')[0],
          lat: item.split(',')[1]
        }
        formatPath.push(point)
      })
      return formatPath
    },
    // 地图缩放后筛选需要展示的区域
    handlerZoom(e) {
      this.zoom = e.target.getZoom()
      this.filterMapList = this.filterMaplist(this.mapList, this.zoom)
      this.infoWindowClose()
    },
    // 初始化百度地图
    handler({ BMap, map }) {
      map.enableScrollWheelZoom(true)
    },

    // 点击行政区划弹出信息框
    showInfoWindow(e) {
      this.infoWindow.position = e.point
      this.infoWindowOpen()
    },
    // 打开信息窗口
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    // 关闭信息窗口
    infoWindowClose(e) {
      this.infoWindow.show = false
    }
  }
}
</script>

<style scoped>
.map-content {
  height: calc(100vh - 84px);
}
</style>

