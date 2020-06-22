<template>
<div>
  <p style="margin-left: 200px;">您好，您的家庭账号：{{superman.familyAccount}}</p>
  <div style="width: 1150px;">
    <!--el-button type="text" @click="dialogFormVisible = true">
      打开form</el-button-->
    <el-button type="primary" style="margin-top: 50px;margin-left: 600px;"
               @click="dialogFormVisible = true">新增</el-button>
    <el-container style="margin-left: 100px;margin-top: 20px;
    margin-right: 10%; background: #42b983;">
      <el-table
        :data="ListMember"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="addedTime"
          label="添加日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="150">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="myAccount"
          label="账号"
          width="180">
        </el-table-column>
      </el-table>
    </el-container>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="member">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="member.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="member.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <!--el-input v-model="newBIAO.deathDate"></el-input-->
          <div class="block">
            <el-date-picker
              v-model="member.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newMember">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
    export default {
        name: "superManage",
      data() {
          return {
            superman: {
              familyAccount: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            member: {
              myAccount: '',
              familyAccount: '',
              name: '',
              birthday: '',
              nickName: '',
              password: '',
              innerI: ''
            },
            ListMember: [
              {
                myAccount: '',
                familyAccount: '',
                name: '',
                birthday: '',
                nickName: '',
                password: '',
                innerId: '',
                addedTime: ''
              }
            ]
        }
      },
      methods: {
          load() {
            this.superman.familyAccount = this.$route.params.familyAccount
          },
        getMember() {
          var _this = this
          this.$http.get('http://localhost:8000/api/getAllMember?familyAccount=' +
                _this.superman.familyAccount)
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0){
              console.log('successful get')
              _this.ListMember = resp.member
            } else {
              console.log(resp.msg)
            }
          })
          .catch(Exception => {
            console.log('exception ', Exception)
          })
        },
        newMember() {
            var _this = this
            if(_this.member.name === '') {
              alert('name can not be null')
              return 0
            }
            if(_this.member.nickName === '') {
              alert('nickName can not be null')
              return 0
            }
            if(_this.member.birthday === ''){
              alert('birthday can not be null')
              return 0
            }
          this.$http.post('http://localhost:8000/api/newMember', {
            familyAccount: _this.superman.familyAccount,
            name: _this.member.name,
            nickName: _this.member.nickName,
            birthday: _this.member.birthday,

          })
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if (resp.error_num === 0){
              console.log('new successfully')
              _this.getMember()
            } else {
              console.log(resp.msg)
            }
            _this.member.name = ''
            _this.member.nickName = ''
            _this.member.birthday = ''
          })
          .catch(exception => {
            console.log('exception', exception)
          })
          _this.dialogFormVisible = false

        }
      },
      mounted() {
          this.load()
        this.getMember()
      }
    }
</script>

<style scoped>

</style>
