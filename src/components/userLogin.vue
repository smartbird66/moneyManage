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
            <el-input type="text" v-model="user.account"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>   <br>
          <el-form-item>
            <el-input type="password" v-model="user.password"
                      placeholder="请输入密码" ></el-input>
          </el-form-item><br>
          <el-form-item>
            <el-button v-on:click="userLogin">登陆</el-button>
          </el-form-item>
          <el-button v-on:click="router" style="margin-right: auto;">
            切换到超级用户登录</el-button>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "userLogin",
        data () {
          return {
            user: {
              account: '',
              password: '',
              familyAccount: ''
            }
          }
        },
        methods: {
          userLogin() {
            var _this = this
            this.$http.post('http://localhost:8000/api/login_member', {
              account: this.user.account,
              password: this.user.password
            })
            .then(response => {
              var res = JSON.parse(response.bodyText)
              if(res.error_num === 0) {
                _this.user.familyAccount = res.list.familyAccount
                alert('successful')
                _this.$store.commit('login', _this.user)
                var path = this.$route.query.redirect
                this.$router.replace({path: path === '/' || path === undefined ? '/billTable' : path})
              } else {
                alert('error')
              }
            })
            .catch(exception => {
              console.log(exception)
            })
          },
          router() {
            this.$router.push('/login')
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
