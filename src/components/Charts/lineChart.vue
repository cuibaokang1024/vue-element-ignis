<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.getLegend()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getSeries() {
      const series = []
      this.chartData.dataList.forEach((item) => {
        series.push({
          name: item.name,
          type: 'line',
          smooth: true,
          data: item.data,
          lineStyle: {

          },
          itemStyle: {
            normal: {
              color: item.style.color, // 图例的颜色
              lineStyle: {
                color: item.style.color,
                width: 2// 线的颜色
              }
            }
          }
        })
      })
      return series
    },
    getLegend() {
      const dataList = []
      this.chartData.dataList.forEach((item) => {
        dataList.push({
          name: item.name,
          textStyle: {
            color: item.style.color
          }
        })
      })
      const chartData = this.chartData
      var legend = {}
      if (chartData.legend) {
        legend = Object.assign({}, legend, {
          data: dataList,
          formatter: function(name) {
            const index = chartData.dataList.findIndex((item) => {
              return item.name === name
            })
            const length = chartData.dataList[index].data.length
            const val = chartData.dataList[index].data[length - 1]
            return name + ' ' + val + chartData.unit
          },
          left: chartData.legendPosition.left,
          right: chartData.legendPosition.right,
          top: chartData.legendPosition.top,
          bottom: chartData.legendPosition.bottom
        })
      } else {
        legend = {
          show: false
        }
      }
      return legend
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const lineUnit = this.chartData.unit
      // const color = this.chartData.color
      const minNum = this.chartData.minNum
      const maxNum = this.chartData.maxNum
      const interval = this.chartData.interval
      const option = {
        // color: color, // 折线图颜色
        // 提示框组件设置
        legend: this.getLegend(),
        tooltip: {
          backgroundColor: 'rgba(46, 126, 139, 0.90)',
          padding: [10, 20, 10, 8],
          textStyle: {
            fontSize: 12,
            lineHeight: 24
          },
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed'
              // color: color
            }
          },
          formatter: function(params, ticket, callback) {
            callback
            let htmlStr = ''
            for (let i = 0; i < params.length; i++) {
              const param = params[i]
              const xName = param.name
              const seriesName = param.seriesName
              const value = param.value
              // var color = param.color;
              if (value.length === 0) {
                continue
              }
              htmlStr += xName
              htmlStr += '<br/><div>'
              htmlStr += seriesName + '：' + value + lineUnit
              htmlStr += '</div>'
            }
            return htmlStr
          }
        },
        // 折线图位置设置
        grid: {
          left: 40,
          right: 14,
          bottom: 20,
          top: 30
        },
        // x轴设置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // 标注字设置
          axisLabel: {
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            },
            formatter: '{value}'
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          minInterval: 1,
          data: this.chartData.xAxisData
        },
        // y轴设置
        yAxis: {
          type: 'value',
          // 轴数值单位
          name: '单位/' + this.chartData.unit,
          // 标注字设置
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          // 分隔线设置
          splitLine: {
            lineStyle: {
              color: 'rgb(23,255,243,0.3)'
            }
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          max: maxNum,
          min: minNum,
          interval: interval
        },
        animationEasing: 'linear', // 初始动画
        animationEasingUpdate: 'quarticInOut', // 数据更新的动画效果
        animationDuration: 3000, // 初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
        animationDurationUpdate: 300, // 数据更新动画的时长
        series: this.getSeries()
      }
      this.chart.setOption(option)
    }
  }
}
</script>
