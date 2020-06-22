<template>
  <el-container>
    <el-header>
      <!--el-button style="margin-right: auto;">
        切换到普通用户登录</el-button-->

    </el-header>
    <el-main>
    <div>
      <el-form class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
          <el-input type="text" v-model="superman.familyAccount"
                placeholder="请输入用户名"></el-input>
        </el-form-item>   <br>
        <el-form-item>
          <el-input type="password" v-model="superman.password"
                placeholder="请输入密码" ></el-input>
        </el-form-item><br>
        <el-form-item>
        <el-button v-on:click="login">登陆</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
        <el-button v-on:click="router" style="margin-right: auto;">
          切换到普通用户登录</el-button>
      </el-form>
    </div>
    </el-main>
    <!--form表格-->
    <el-dialog title="注册" :visible.sync="dialogFormVisible" @close="clear">
      <el-form v-model="superForm" style="text-align: left" ref="dataForm">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="superForm.password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="superForm.newPassword" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="输入地址" :label-width="formLabelWidth">
          <el-input type="text" v-model="superForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkRegister">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
    export default {
        name: "login",
      data () {
          return {
            superman: {
              familyAccount: '',
              password: '',
              address: '',
              number: ''
            },
            responseResult: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            superForm: {
              password: '',
              address: '',
              newPassword: ''
            }
          }
      } ,
      methods: {
          login () {
            this.$http.post('http://localhost:8000/api/login_superman',
              {
                familyAccount: this.superman.familyAccount,
                password: this.superman.password
              }
            )
            .then(response=> {
              var res = JSON.parse(response.bodyText)
              if(res.error_num === 0) {
                alert('successful')
                this.$router.push({
                  path:'/superManage',
                  name: 'superManage',
                  params:{
                    familyAccount: this.superman.familyAccount}})
              } else {
                alert(res.msg)
              }
            })
            .catch(Exception =>
            alert('请求失败')
            )
          },
          register() {
            var _this = this
            this.$http.post('http://localhost:8000/api/registerSuperman', {
              password: _this.superForm.password,
              address: _this.superForm.address
            })
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0) {
                console.log('register successful')
                alert('您的账号为：'+ resp.familyAccount+ ' ,请妥善保存！')
              } else {
                alert('注册失败')
              }
              _this.dialogFormVisible=false
            })
            .catch(exception => {
              console.log(exception)
            })
          },
          router() {
            this.$router.push('/userLogin')
          },
        clear() {
          this.superForm.password = ''
          this.superForm.newPassword = ''
          this.superForm.address = ''
        },
        checkRegister() {
            if(this.superForm.password === '' || this.superForm.newPassword === ''){
              alert('password can not be null')
              this.dialogFormVisible = false
              return
            }
            if(this.superForm.address === ''){
              alert('address can not be null')
              this.dialogFormVisible = false
              return
            }
            if(this.superForm.password !== this.superForm.newPassword) {
              alert('请输入一致的密码')
              this.dialogFormVisible = false
              return
            }
            this.register()
        }
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

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
