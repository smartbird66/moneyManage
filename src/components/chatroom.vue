<template>
  <div class="login-container" label-position="left" label-width="0px">
    <h3 style="margin-top: 2px;">幸福一家人</h3>
    <div id="chartCard" style="height: 300px; overflow: auto;">
    <div v-for="(myMessage,index) in message" :key="index">
      <el-row style="">
        <el-col class="el-row" :span="12" >
          <div style="margin-left: 2px;">
          <p style="margin-left: 2px; font-family: 仿宋;">
            {{myMessage.nickName}}说:{{myMessage.msg}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="margin-left: 2px; font-family: 仿宋; color: #42b983;"><p>发送时间:{{myMessage.sendTime}}</p></el-col>
      </el-row>
    </div>
    </div>
    <el-input v-model="input" type="text"
              style=" margin-left: 10px; width: 400px;margin-bottom: 10px;">

    </el-input>
    <el-button @click="sendMessage()" type="primary" round >发送</el-button>
  </div>
</template>

<script>
    export default {
        name: "chatroom",
      data() {
          return {
            input: '',
            message: [
              {
                msg: 'hello',
                account: '123',
                familyAccount: '',
                sendTime: '',
                nickName: ''
              },{
                msg: 'good morning',
                account: '321',
                familyAccount: '',
                sendTime: '',
                nickName: ''
              }
            ]
          }
      },
      methods: {
          getAllMsg() {
            var _this = this
            this.$http.get('http://localhost:8000/api/getAllMsg?familyAccount=' +
                _this.$store.state.user.familyAccount)
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0){
                console.log('get msg successfully')
                _this.message = resp.message
              } else {
                console.log(resp.msg)
              }
            })
            .catch(Exceptin => {
              console.log('exception:', Exceptin)
            })
          },
          sendMessage() {
            var _this = this
            if (this.input === '') {
              return 0
            } else {
              _this.$http.post('http://localhost:8000/api/newMessage', {
                account: _this.$store.state.user.account,
                familyAccount: _this.$store.state.user.familyAccount,
                msg: _this.input
              })
              .then(response => {
                var resp = JSON.parse(response.bodyText)
                if (resp.error_num === 0) {
                  console.log('successful send')
                  _this.input = ''
                  this.getAllMsg()
                } else {
                  console.log('failed send')
                }
              })
              .catch(Exception => {
                console.log('Exception when sending')
              })
            }
          }
      },
      mounted() {
          this.getAllMsg()
        // var container = this.$el.querySelector("chartCard");

        // container.scrollTop = container.scrollHeight;
      }
    }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .el-col {
    text-align: left;
     }
</style>
