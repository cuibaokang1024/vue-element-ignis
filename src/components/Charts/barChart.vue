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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        title: {
          text: this.chartData.title,
          x: '4%',
          textStyle: {
            color: '#fff',
            fontSize: '14'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }

          }
        },
        grid: {
          borderWidth: 0,
          top: 25,
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '4%',
          top: '11%',
          textStyle: {
            color: '#90979c'
          },
          data: [this.chartData.name]
        },

        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            'show': false
          },
          axisTick: {
            'show': true
          },
          splitArea: {
            'show': false
          },
          axisLabel: {
            interval: 0

          },
          data: this.chartData.xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            interval: 0

          },
          splitArea: {
            show: false
          }

        }],
        series: [{
          name: this.chartData.name,
          type: 'bar',
          stack: '总量',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#00bfb7',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          data: this.chartData.value
        }]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
