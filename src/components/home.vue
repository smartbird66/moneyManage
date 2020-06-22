<template>
    <div>
      <user-manage></user-manage>
      <!--子页面（组件）显示的地方-->
      <router-view/>
    </div>
</template>

<script>
  import userManage from "./userManage";
    export default {
        name: "home",
      components: {userManage}
    }
</script>

<style scoped>

</style>
