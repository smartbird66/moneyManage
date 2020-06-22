<template>
  <el-container style="margin-top: 100px;margin-left: 100px;margin-right: 60px; background: #42b983;">
  <!--h1 style="position: fixed; margin-top: 50px; margin-left: 300px;">这里放表格</h1-->
  <!--el-card style=" position:fixed; width: 500px; height: 800px;background: red;"></el-card-->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="addTime"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额(元)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="consumptionType"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注"
        width="200">
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
    export default {
        name: "billTable",
        data() {
          return {
            tableData: [{
              addTime: '2016-05-03',
              money: '0',
              familyAccount: '0',
              account: '0',
              note: '********',
              consumptionType: '******'
            },{
              addTime: '2016-05-03',
              money: '0',
              familyAccount: '0',
              account: '0',
              note: '********',
              consumptionType: '******'
            }]
          }
        },
        methods: {
          load() {
            var _this = this
            this.$http.get('http://localhost:8000/api/getBillByAccount?account=' +
                _this.$store.state.user.account)
            .then(response => {
              var res = JSON.parse(response.bodyText)
              if (res.error_num === 0){
                _this.tableData = res.bill
              } else {
                console.log(res.error_num)
              }
            })
            .catch(Exception => {
              console.log(Exception)
            })
          }
        },
      mounted() {
          this.load()
      }
    }
</script>

<style scoped>

</style>
