<template>
<el-container>
    <el-form class="login-container" label-position="left" label-width="0px">
      <div align="center">
        <p id="account">账户：{{ info.account }}</p>
        <p id="name">昵称：{{ info.nickName }}</p>
        <p id="phoneNum">生日：{{ info.birthday }}</p>
        <p id="QQ">姓名：{{ info.name }}</p>
      </div>
      <el-form-item>
        <el-button type="primary" style="width: 100%;background: #eb1414;border: none"
                   v-on:click="dialogFormVisible = true">修改密码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;background: #eb1414;border: none"
                   v-on:click="dialogFormVisible2 = true">修改个人信息</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;background: #eb1414;border: none"
                   v-on:click="router">退出登陆</el-button>
      </el-form-item>
    </el-form>
  <!--form表格-->
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="clear">
    <el-form v-model="user" style="text-align: left" ref="dataForm">
      <el-form-item label="原密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="user.oldPassword" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="user.newPassword1" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="user.newPassword2" placeholder="请再次输入输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkPassword()">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" @close="clear">
    <el-form v-model="info" style="text-align: left" ref="dataForm">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input type="text" v-model="info.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input type="text" v-model="info.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <!--el-input v-model="newBIAO.deathDate"></el-input-->
        <div class="block">
          <el-date-picker
            v-model="info.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="changeInfo">确 定</el-button>
    </div>
  </el-dialog>
</el-container>
</template>

<script>
    export default {
        name: "personCenter",
        data() {
          return {
            info: {
              account: '',
              nickName: '',
              name: '',
              birthday: '',
              password: '',
              familyAccount: '',
              addTime: ''
            },
            dialogFormVisible: false,
            dialogFormVisible2: false,
            formLabelWidth: '120px',
            user: {
              account: '123456',
              // account: this.$store.state.user.account,
              oldPassword: '',
              newPassword1: '',
              newPassword2: ''
            }
          }
        },
        methods: {
          router() {
            this.$router.push('/userLogin')
          },
          changePassword() {
            var _this = this
            this.$http.get('http://localhost:8000/api/changePassword?account='+
                _this.info.account + '&password=' + _this.user.newPassword2)
            .then(response => {
              resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0){
                console.log('change password!')
              } else {
                console.log('change error')
              }
            })
            .catch(Exception => {
              console.log('change password exception')
            })
          },
          checkPassword () {
            var _this = this
            if (_this.user.oldPassword === _this.info.password) {
              if (_this.user.newPassword1 === _this.user.newPassword2){
                _this.changePassword()
              } else {
                alert('新密码不匹配')
              }
            } else {
              alert('原密码错误')
            }
            _this.dialogFormVisible = false
            _this.clear()
          },
          rlogin() {

          },
          clear() {
              this.user.oldPassword = ''
              this.user.newPassword1 = ''
              this.user.newPassword2 = ''
          },
          load() {
            var _this = this
            this.$http.get('http://localhost:8000/api/getInfo?account=' +
                          _this.$store.state.user.account)
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              // alert(resp)
              if (resp.error_num === 0) {
                _this.info = resp.member[0].fields
                _this.info.account = _this.$store.state.user.account
              } else {
                console.log(resp.error_num)
              }
            })
            .catch(Exception => {
              console.log('exception')
            })
          },
          changeInfo() {
            var _this = this
            this.$http.post('http://localhost:8000/api/changeInfo', {
              account: _this.info.account,
              name: _this.info.name,
              nickName: _this.info.nickName,
              birthday: _this.info.birthday
            })
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0) {
                alert('修改成功')
              } else {
                alert('修改失败')
              }
            })
            .catch(exception => {
              console.log(exception)
            })
            _this.dialogFormVisible2 = false
          }
        },
      mounted() {
          this.load()
      }
    }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
