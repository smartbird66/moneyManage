<template>
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
        label="借款添加日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deathDate"
        label="还款日期"
        width="140">
      </el-table-column>
      <el-table-column
        prop="person"
        label="借款人/还款人"
        width="140">
      </el-table-column>
      <el-table-column
        prop="ioo"
        label="外借/借入"
        width="140">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        width="130">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index , tableData,scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="checkBIAO(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改赊借单" :visible.sync="dialogFormVisible1">
      <el-form :model="BIAOForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="金额" prop="principal">
          <el-input v-model="BIAOForm.money"></el-input>
        </el-form-item>
        <el-form-item label="借款人/还款人" prop="consumptionType">
          <!--el-select v-model="investmentForm.InvestmentType" placeholder="请选择活动区域">
            <el-option label="游戏娱乐" value="游戏娱乐"></el-option>
            <el-option label="餐饮美食" value="餐饮美食"></el-option>
            <el-option label="人情世故" value="人情世故"></el-option>
            <el-option label="家用日常" value="家用日常"></el-option>
            <el-option label="学习办公" value="学习办公"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select-->
          <el-input v-model="BIAOForm.person"></el-input>
        </el-form-item>
        <el-form-item label="还款日期" prop="note">
          <el-input v-model="BIAOForm.deathDate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="changeBIAO()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增赊借" :visible.sync="dialogFormVisible2">
      <el-form :model="newBIAO" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="金额" prop="principal">
          <el-input v-model="newBIAO.money"></el-input>
        </el-form-item>
        <el-form-item label="借款人/还款人" prop="consumptionType">
          <el-input v-model="newBIAO.person"></el-input>
        </el-form-item>
        <el-form-item label="还款日期" prop="note">
          <!--el-input v-model="newBIAO.deathDate"></el-input-->
          <div class="block">
            <el-date-picker
              v-model="newBIAO.deathDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createNewBIAO()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "borrowInAndOut",
      methods: {
        handleClick(index, rows, row) {
          rows.splice(index, 1)
          this.deleteBIAO(row)
        },
        createNewBIAO() {
          var _this = this
          _this.$http.post('http://localhost:8000/api/newBIAO', {
            account: _this.$store.state.user.account,
            familyAccount: _this.$store.state.user.familyAccount,
            money: _this.newBIAO.money,
            person: _this.newBIAO.person,
            deathDate: _this.newBIAO.deathDate,
          })
          .then(response => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num === 0) {
              console.log('new BIAO successful')
              _this.load()
            } else {
              console.log('new BIAO error')
            }
          })
          .catch(exception => {
            console.log('new BIAO exception', exception)
          })
          _this.load()
          _this.dialogFormVisible2 = false
          _this.newBIAO.money = ''
          _this.newBIAO.person = ''
          _this.newBIAO.deathDate = ''
        },
        deleteBIAO (row) {
          var _this = this
          this.$http.get('http://localhost:8000/api/deleteBIAO?account=' +
                row.account + '&addTime=' + row.addTime)
          .then(response => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num === 0) {
              console.log('successful')
            } else {
              console.log('error')
            }
          })
          .catch(exception => {
            console.log(exception)
          })
        },
        load () {
          var _this = this
          _this.$http.get('http://localhost:8000/api/getAllBIAO?account=' +
              _this.$store.state.user.account)
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if (resp.error_num === 0) {
              console.log('load successful')
              _this.tableData = resp.BAO
              var len = _this.tableData.lengthn
              console.log(len)
              _this.tableData.forEach(item => {
                if(item.money > 0) {
                  item.ioo = '借入'
                } else {
                  item.ioo = '借出'
                }
              })
            } else {
              console.log('load fail')
            }
          })
        },
        checkBIAO(row) {
          this.BIAOForm = row
          console.log(row.person)
          this.dialogFormVisible1 = true
        },
        changeBIAO() {
          var _this = this
          _this.$http.post('http://localhost:8000/api/changeBIAO', {
            account: _this.BIAOForm.account,
            familyAccount: _this.BIAOForm.familyAccount,
            person: _this.BIAOForm.person,
            money: _this.BIAOForm.money,
            deathDate: _this.BIAOForm.deathDate,
            addTime: _this.BIAOForm.addTime
          })
            .then(response => {
              resp = JSON.parse(response.body)
              if (resp.error_num === 0){
                console.log('change BIAO successfully')
              } else {
                console.log('error when change BIAO')
              }
            })
            .catch (Exception => {
              console.log('exception when change BIAO')
            })
          this.dialogFormVisible1 = false
        }
      },
      data() {
        return {
          tableData: [{
            addTime: '',
            person: '',
            money: '',
            deathDate: '',
            account: 0,
            familyAccount: 0,
            ioo: ''
          }],
          newBIAO: {
            account: '',
            familyAccount: '',
            money: '',
            person: '',
            deathDate: '',
            addTime: ''
          },
          BIAOForm: {
            account: '',
            familyAccount: '',
            money: '',
            person: '',
            deathDate: '',
            addTime: ''
          },
          dialogFormVisible1: false,
          dialogFormVisible2: false
        }
      },
      mounted() {
          this.load()
      }
    }
</script>

<style scoped>

</style>
