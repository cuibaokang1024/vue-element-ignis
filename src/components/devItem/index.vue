<template>
  <div>
    <div v-if="devType=== 0" class="devItem">
      <div class="icon-wrapper" />
      <div class="detail">
        <span class="devId">{{ `设备号：${devData.id}` }}</span>
        <span class="update">{{ `更新：${devData.upDate}` }}</span>
        <span class="location">{{ `位置：${devData.location}` }}</span>
        <div class="operation">
          <el-button size="small" type="primary" class="dev-detail">详情</el-button>
          <el-button size="small" type="primary" class="alarm-record">报警记录</el-button>
        </div>
      </div>
    </div>
    <div v-if="devType=== 1" class="devItem">
      <div class="icon-wrapper" />
      <div class="detail">
        <span class="devName">{{ devData.name }}</span>
        <span class="devId">{{ `设备号：${devData.id}` }}</span>
        <span class="update">{{ `更新：${devData.upDate}` }}</span>
        <span class="location">{{ `位置：${devData.location}` }}</span>
        <div class="operation">
          <el-button>详情</el-button>
          <el-button>报警记录</el-button>
        </div>

      </div>
    </div>
    <div v-if="devType=== 2" class="devItem">
      <div class="icon-wrapper" />
      <div class="detail">
        <span class="devId">{{ `设备号：${devData.id}` }}</span>
        <div class="devInfo">{{ `电量${devData.eleQuantity} 信号强度${devData.signal}` }}</div>
        <span class="update">{{ `更新：${devData.upDate}` }}</span>
        <span class="location">{{ `位置：${devData.location}` }}</span>
        <div class="" />
      </div>
    </div>
    <div v-if="devType=== 3" class="devItem">
      <div class="icon-wrapper" />
      <div class="detail">
        <span class="devName">{{ devData.Name }}</span>
        <span class="update">{{ devData.update }}</span>
        <span class="location">{{ devData.location }}</span>
        <el-button>网络摄像机</el-button>
      </div>
    </div>
    <div v-if="devType=== 4" class="devItem">
      <div class="icon-wrapper" />
      <div class="detail">
        <span class="devName">{{ `设备号：${devData.id}` }}</span>
        <span class="update">{{ `更新：${devData.upDate}` }}</span>
        <span class="update">{{ `名称：${devData.name}` }}</span>
        <span class="location">{{ `位置：${devData.location}` }}</span>
        <el-button>信息传输装置</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'DevItem',
  props: {
    devType: {
      type: Number,
      default: 0
    },
    devData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
    .devItem{
        width: 275px;
        height: 168px;
        display: flex;
        margin: 5px 5px 15px;
        border-radius: 10px;
        background: #cff0ff;
        border: 1px solid #88c2dc;
        .icon-wrapper{
            width: 64px;
            height: 100%;
        }
        .detail{
            position: relative;
            flex: 1;
            padding: 10px 10px 42px 0;
            span{
                display: inline-block;
                text-align: justify;
                margin-bottom: 10px;
                line-height: 18px;
                &:nth-child(1){
                  font-weight: bold;
                }
            }
            .location{
                width: 100%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-break: break-all;
            }
        }
        .operation{
            position: absolute;
            bottom: 0;
            height: 42px;
            .el-button{
                width: 80px;
                border-radius: 5px;
            }
        }
    }
</style>
