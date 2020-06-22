<template>
  <div style="width: 900px;">
    <!--el-button type="text" @click="dialogFormVisible = true">
      打开form</el-button-->
    <el-button type="primary" style="margin-top: 50px;margin-left: 600px;"
    @click="dialogFormVisible2 = true">新增</el-button>
  <el-container style="margin-left: 100px;margin-top: 20px;
    margin-right: 10%; background: #42b983;">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="addTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金额"
      width="90">
    </el-table-column>
    <el-table-column
      prop="consumptionType"
      label="消费类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleClick(scope.$index, tableData, scope.row)" type="text" size="small">删除</el-button>
        <el-button  @click.native.prevent="changeBill(scope.row)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="changeForm">
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="changeForm.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="changeForm.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="消费类型" :label-width="formLabelWidth">
          <el-select v-model="changeForm.consumptionType" placeholder="请选择活动区域">
            <el-option label="游戏娱乐" value="游戏娱乐"></el-option>
            <el-option label="餐饮美食" value="餐饮美食"></el-option>
            <el-option label="人情世故" value="人情世故"></el-option>
            <el-option label="家用日常" value="家用日常"></el-option>
            <el-option label="学习办公" value="学习办公"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkChangeBill">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
    <el-dialog title="新增账单" :visible.sync="dialogFormVisible2">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="金额" prop="money">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="账单类型" prop="consumptionType">
          <el-select v-model="ruleForm.consumptionType" placeholder="请选择活动区域">
            <el-option label="游戏娱乐" value="游戏娱乐"></el-option>
            <el-option label="餐饮美食" value="餐饮美食"></el-option>
            <el-option label="人情世故" value="人情世故"></el-option>
            <el-option label="家用日常" value="家用日常"></el-option>
            <el-option label="学习办公" value="学习办公"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="ruleForm.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkNewBill()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "billManage",
      data() {
        return {
          tableData: [{
            addTime: '2016-05-03',
            money: '0',
            familyAccount: '0',
            account: '0',
            note: '********',
            consumptionType: '******'
          }, {
            addTime: '2016-05-03',
            money: '0',
            familyAccount: '0',
            account: '0',
            note: '********',
            consumptionType: '******'
          }],
          dialogFormVisible: false,
          dialogFormVisible2: false,
          formLabelWidth: '120px',
          ruleForm: {
            money: '',
            familyAccount: '',
            account: '',
            note: '',
            consumptionType: ''
          },
          changeForm: {
            account: '',
            addTime: '',
            money: '',
            note: '',
            consumptionType: '',
            familyAccount: ''
          }
        }
      },
      methods: {
        handleClick(index, rows, row) {
          this.deleteRow(row)
          rows.splice(index, 1)
        },
        deleteRow(row) {
          var _this = this
          _this.$http.get('http://localhost:8000/api/deleteBill?account=' +
              row.account + '&addTime=' + row.addTime)
          .then(response => {
            resp = JSON.parse(response.body)
            if (resp.error_num === 0){
              console.log('delete bill successfully')
            } else {
              console.log('error when delete bill')
            }
          })
          .catch (Exception => {
            console.log('exception when delete bill')
          })
        },
        checkChangeBill () {
          var _this = this
          this.$http.post('http://localhost:8000/api/changeBill', {
            account: this.changeForm.account,
            addTime: this.changeForm.addTime,
            note: this.changeForm.note,
            money: this.changeForm.money,
            consumptionType: this.changeForm.consumptionType,
            familyAccount: this.changeForm.familyAccount
          })
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0) {
              console.log('change successfully')
              _this.load()
            } else {
              console.log('error when change bill')
            }
          })
          .catch(Exception => {
            console.log('Exception when change')
          })
          this.dialogFormVisible = false
        },
        changeBill (row) {
          var _this = this
          _this.changeForm.account = row.account
          _this.changeForm.addTime = row.addTime
          _this.changeForm.note = row.note
          _this.changeForm.money = row.money
          _this.changeForm.consumptionType = row.consumptionType
          _this.changeForm.familyAccount = _this.familyAccount
          _this.dialogFormVisible = true
        },
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
        },
        newBill () {
          var _this = this
          this.$http.post('http://localhost:8000/api/newBill', {
            account: _this.ruleForm.account,
            familyAccount: _this.ruleForm.familyAccount,
            money: _this.ruleForm.money,
            consumptionType: _this.ruleForm.consumptionType,
            note: _this.ruleForm.note
          })
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0) {
              console.log('new Bill successfully')
              _this.load()
            } else {
              console.log('new Bill fail')
            }
          })
          .catch(Exception => {
            console.log('new Bill Exception')
          })
        },
        checkNewBill () {
          var _this = this
          _this.ruleForm.account = _this.$store.state.user.account
          _this.ruleForm.familyAccount = _this.$store.state.user.familyAccount
          console.log(_this.ruleForm.familyAccount)
          if (_this.ruleForm.familyAccount === '') {
            console.log('familyAccount null')
            return 0
          }
          if (_this.ruleForm.money === '') {
            console.log('money null')
            return 0
          }
          if (_this.ruleForm.consumptionType === '') {
            console.log('familyAccount null')
            return 0
          }
          if (_this.ruleForm.note === '') {
            _this.ruleForm.note = '空'
          }
          _this.newBill()
          _this.dialogFormVisible2 = false
        }
      },
      mounted() {
          this.load()
      }
    }
</script>

<style scoped>

</style>
