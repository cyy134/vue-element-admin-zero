<!--
* @description 头部组件
* @fileName index.vue
* @author zero_fsc
* @date 2020-07-30 22:56:36
!-->
<template>
  <div class="yl-header">
    <el-header>
      <el-col :span="6">
        <span>hello</span>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="6"></el-col>
    </el-header>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss">
  .yl-header {
    height: 80px;
    .el-header {
      height: 80px;
      line-height: 80px;
    }
  }
</style>
