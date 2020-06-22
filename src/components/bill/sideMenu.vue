<template>
  <el-col :span="12">
    <el-menu
      default-active="2"
      router
      class="categories"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的账单</span>
        </template>
        <el-menu-item-group>
          <template slot="title">账单统计</template>
          <el-menu-item index="billTable">表格</el-menu-item>
          <el-menu-item index="billPicture">图表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">账单管理</template>
          <el-menu-item index="billManage">管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="familyBill">
        <i class="el-icon-menu"></i>
        <span slot="title">家庭账单</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
    export default {
        name: "sideMenu",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 40%;
    left: -600px;
    top: 100px;
    width: 200px;
  }
</style>
