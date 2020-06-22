<template>
  <el-container style="margin-top: 100px;margin-left: 100px;margin-right: 60px;">
    <el-tabs type="border-card" style="width: 100%;"
             v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本月账单" style="width: 100%;" name="first">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-card style="width: 200px; height: 120px;">
              <p >总支出</p>
              <p>{{statistics.all}}元</p>
            </el-card>
          </el-col>
          <el-col :span="5"><el-card style="width: 200px; height: 120px;">
            <p >总收入</p>
            <p>{{statistics.income}}元</p>
          </el-card></el-col>
        </el-row>
        <section class="chart-container" style="margin-top: 10px;">
              <div id="chartPie" style="width:100%; height:400px;"></div>
        </section>
      </el-tab-pane>
      <el-tab-pane label="上月账单" style="width: 100%;" name="second">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-card style="width: 200px; height: 120px;">
              <p >总支出</p>
              <p>{{statistics2.all}}元</p>
            </el-card>
          </el-col>
          <el-col :span="5"><el-card style="width: 200px; height: 120px;">
            <p >总收入</p>
            <p>{{statistics2.income}}元</p>
          </el-card></el-col>
        </el-row>
        <section class="chart-container" style="margin-top: 10px;">
              <div id="chartPie2" style=" width:100%; height:400px;"></div>
        </section>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "billPicture",
      data() {
        return {
          activeName: 'first',
          chartPie: null,
          bill: [
            {
              addTime: '2016-05-03',
              money: '0',
              familyAccount: '0',
              account: '0',
              note: '********',
              consumptionType: '******'
            }
          ],
          chartPie2: null,
          lastMothBill: [
            {
              addTime: '2016-05-03',
              money: '0',
              familyAccount: '0',
              account: '0',
              note: '********',
              consumptionType: '其他'
            }
          ],
          statistics: {
            entertainment: 0,
            food: 0,
            ways: 0,
            daily: 0,
            work: 0,
            other: 0,
            all: 0,
            income: 0
          },
          statistics2: {
            entertainment: 0,
            food: 0,
            ways: 0,
            daily: 0,
            work: 0,
            other: 0,
            all: 0,
            income: 0
          }
        }
      },
      methods: {
        handleClick(tab, events) {
          var _this = this
          if (tab.index == 1) {
            _this.activeName = 'second'
            setTimeout(() => {
              _this.drawPieChart2()
            }, 100)
          }
          if(tab.index == 0) {
            _this.activeName = 'first'
            setTimeout(() => {
              _this.drawPieChart()
            }, 100)
          }
        },
        drawPieChart() {
          var _this = this
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
            title: {
              text: 'bill statistics',
              subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: { // 悬浮时的信息
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {  // 图例
              orient: 'vertical', // 图的类型vertical饼状图
              left: 'left',
              data: ['游戏娱乐', '餐饮美食', '人情世故', '家用日常', '学习办公','其他']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'], // 图的中心
                data: [ // 数据
                  { value: _this.statistics.entertainment, name: '游戏娱乐' },
                  { value: _this.statistics.food, name: '餐饮美食' },
                  { value: _this.statistics.ways, name: '人情世故' },
                  { value: _this.statistics.daily, name: '家用日常' },
                  { value: _this.statistics.work, name: '学习办公' },
                  { value: _this.statistics.other, name: '其他' }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        },
        drawPieChart2() {
          var _this = this
          this.chartPie2 = echarts.init(document.getElementById('chartPie2'))
          this.chartPie2.setOption({
            title: {
              text: 'bill statistics',
              subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['游戏娱乐', '餐饮美食', '人情世故', '家用日常', '学习办公','其他']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  { value: _this.statistics2.entertainment, name: '游戏娱乐' },
                  { value: _this.statistics2.food, name: '餐饮美食' },
                  { value: _this.statistics2.ways, name: '人情世故' },
                  { value: _this.statistics2.daily, name: '家用日常' },
                  { value: _this.statistics2.work, name: '学习办公' },
                  { value: _this.statistics2.other, name: '其他' }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        },
        drawCharts() {
          this.loadValue()
          this.loadLastValue()
          //this.drawPieChart()
          setTimeout(() => {
            this.drawPieChart()
          }, 100)
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
        loadValue() {
          var _this = this
          this.$http.get('http://localhost:8000/api/getValue?account=' +
                  _this.$store.state.user.account)
          .then(response => {
            var resp = JSON.parse(response.bodyText)
            if(resp.error_num === 0){
              _this.statistics.entertainment = resp.statistics.entertainment
              _this.statistics.food = resp.statistics.food
              _this.statistics.ways = resp.statistics.ways
              _this.statistics.daily = resp.statistics.daily
              _this.statistics.work = resp.statistics.work
              _this.statistics.other = resp.statistics.other
              _this.statistics.income = resp.statistics.income
              _this.statistics.all = _this.statistics.entertainment + _this.statistics.food +
                      _this.statistics.ways + _this.statistics.daily + _this.statistics.work +
                      _this.statistics.other
            } else{
              console.log(resp.error_num)
            }
          })
          .catch(Exception => {
            console.log('Exception')
          })
        },
        loadLastValue() {
          var _this = this
          this.$http.get('http://localhost:8000/api/getLastValue?account=' +
            _this.$store.state.user.account)
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0){
                _this.statistics2.entertainment = resp.statistics.entertainment
                _this.statistics2.food = resp.statistics.food
                _this.statistics2.ways = resp.statistics.ways
                _this.statistics2.daily = resp.statistics.daily
                _this.statistics2.work = resp.statistics.work
                _this.statistics2.other = resp.statistics.other
                _this.statistics2.income = resp.statistics.income
                _this.statistics2.all = _this.statistics2.entertainment + _this.statistics2.food +
                  _this.statistics2.ways + _this.statistics2.daily + _this.statistics2.work +
                  _this.statistics2.other
              } else{
                console.log(resp.error_num)
              }
            })
            .catch(Exception => {
              console.log('Exception')
            })
        }
      },
      mounted() {
          this.drawCharts()
      }
    }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  .el-col {
    padding: 30px 20px;
  }
</style>
