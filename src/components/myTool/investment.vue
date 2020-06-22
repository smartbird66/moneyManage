<template>
  <!--el-container style="margin-top: 100px;margin-left: 300px;
  margin-right: 300px; background: #42b983;"-->
  <div style="width: 900px; margin-left: 20%;">
    <el-button type="primary" style="margin-top: 50px;margin-left: 800px;"
               @click="dialogFormVisible2 = true">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        fixed
        prop="addTime"
        label="添加日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="InvestmentType"
        label="投资类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="earnings"
        label="收益"
        width="120">
      </el-table-column>
      <el-table-column
        prop="principal"
        label="本金"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteCheck( scope.$index,tableData,scope.row)" type="text" size="small">删除</el-button>
          <el-button  @click="checkInvestment(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改投资单" :visible.sync="dialogFormVisible1">
      <el-form :model="investmentForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="金额" prop="principal">
          <el-input v-model="investmentForm.principal"></el-input>
        </el-form-item>
        <el-form-item label="投资类型" prop="consumptionType">
          <!--el-select v-model="investmentForm.InvestmentType" placeholder="请选择活动区域">
            <el-option label="游戏娱乐" value="游戏娱乐"></el-option>
            <el-option label="餐饮美食" value="餐饮美食"></el-option>
            <el-option label="人情世故" value="人情世故"></el-option>
            <el-option label="家用日常" value="家用日常"></el-option>
            <el-option label="学习办公" value="学习办公"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select-->
          <el-input v-model="investmentForm.InvestmentType"></el-input>
        </el-form-item>
        <el-form-item label="收益" prop="note">
          <el-input v-model="investmentForm.earnings"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateInvestment()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增投资单" :visible.sync="dialogFormVisible2">
      <el-form :model="newInvestmentDate" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="金额" prop="principal">
          <el-input v-model="newInvestmentDate.principal"></el-input>
        </el-form-item>
        <el-form-item label="投资类型" prop="consumptionType">
          <el-input v-model="newInvestmentDate.investmentType"></el-input>
        </el-form-item>
        <el-form-item label="收益" prop="note">
          <el-input v-model="newInvestmentDate.earnings"></el-input>
        </el-form-item>
        <el-form-item label="收益率(%)" prop="note">
          <el-input v-model="newInvestmentDate.rate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="newInvestment()">确 定</el-button>
      </div>
    </el-dialog>
  <!--/el-container-->
  </div>
</template>

<script>
    export default {
        name: "investment",
      methods: {
        handleClick(row) {
          console.log(row);
        },
        checkInvestment(row) {
          this.investmentForm = row
          this.dialogFormVisible1 = true
        },
        load() {
          var _this = this
          _this.$http.get('http://localhost:8000/api/getAllInvestment?account=' +
                  _this.$store.state.user.account)
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0) {
              console.log('successful get')
              _this.tableData = resp.investment
            } else {
              console.log('error')
            }
          })
          .catch(exception => {
            console.log('exception', exception)
          })
        },
        updateInvestment() {
          var _this = this
          this.$http.post('http://localhost:8000/api/changeInvestment', {
            account: _this.investmentForm.account,
            addTime: _this.investmentForm.addTime,
            principal: _this.investmentForm.principal,
            earnings: _this.investmentForm.earnings,
            rate: _this.investmentForm.rate
          })
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0){
              alert('添加成功')
              _this.load()
            } else {
              console.log('change fail')
            }
            _this.dialogFormVisible1 = false
          })
          .catch(exceprion => {
            console.log('exception when change investment')
          })
        },
        deleteInvestment(row) {
          var _this = this
          _this.$http.get('http://localhost:8000/api/deleteInvestment?account=' +
              row.account + '&addTime=' + row.addTime)
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0) {
              console.log('delete successfully')
            } else {
              console.log('delete fail')
            }
          })
          .catch(exception => {
            console.log('exception:', exception)
          })
        },
        deleteCheck(index, rows, row) {
          rows.splice(index, 1)
          this.deleteInvestment(row)
        },
        newInvestment() {
          var _this = this
          _this.$http.post('http://localhost:8000/api/newInvestment', {
            account: _this.$store.state.user.account,
            familyAccount: _this.$store.state.user.familyAccount,
            InvestmentType: _this.newInvestmentDate.investmentType,
            principal: _this.newInvestmentDate.principal,
            earnings: _this.newInvestmentDate.earnings,
            rate: _this.newInvestmentDate.rate,
          })
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0) {
                console.log('new successfully')
                _this.load()
              } else {
                console.log('new fail')
              }
            })
            .catch(exception => {
              console.log('exception:', exception)
            })
          this.dialogFormVisible2 = false
        }
      },
      mounted() {
          this.load()
      },
      data() {
        return {
          tableData: [{
            addTime: '2016-05-03',
            updateTime: '王小虎',
            principal: '',
            earnings: '',
            rate: '',
            account: '',
            familyAccount: ''
          }],
          investmentForm: {
            account: '',
            addTime: '',
            investmentType: '',
            principal: '',
            updateTime: '',
            earnings: '',
            rate: ''
          },
          newInvestmentDate: {
            account: '',
            familyAccount: '',
            principal: '',
            earnings: '',
            rate: '',
            investmentType: ''
          },
          dialogFormVisible1: false,
          dialogFormVisible2: false,
        }
      }
    }
</script>

<style scoped>

</style>
