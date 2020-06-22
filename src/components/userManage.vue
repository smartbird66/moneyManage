<template>
  <!--el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu-->
  <div>
    <!--router 打开路由模式-->
  <el-menu
    :default-active="activeIndex2"
    router
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="billIndex">账单</el-menu-item>
    <el-submenu index="2">
      <template slot="title">其他工具</template>
      <el-menu-item index="borrowInAndOut">赊借</el-menu-item>
      <el-menu-item index="investment">投资理财</el-menu-item>
    </el-submenu>
    <el-menu-item index="chatroom">
      家庭聊天室</el-menu-item>
    <el-menu-item index="personCenter">个人中心</el-menu-item>
  </el-menu>
  </div>
</template>

<script>
    export default {
      name: "userManage",
      data() {
        return {
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
