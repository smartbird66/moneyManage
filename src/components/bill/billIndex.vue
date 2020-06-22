<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <!--<SideMenu></SideMenu>-->
      <sideMenu></sideMenu>
    </el-aside>
    <router-view/>
      <!--h3>billIndex的子组件</h3-->
    <!--el-main-->
      <!--<books></books>-->
    <!--/el-main-->
  </el-container>
</template>

<script>
  import sideMenu from "./sideMenu";
  export default {
        name: "manage",
        components: {sideMenu}
    }
</script>

<style scoped>

</style>
