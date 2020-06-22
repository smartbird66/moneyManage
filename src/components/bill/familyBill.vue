<template>
  <el-container style="margin-top: 100px;margin-left: 100px;margin-right: 60px;">
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane label="本月账单" style="width: 100%;">
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
    <section class="chart-container">
          <div id="chartPie" style="width:100%; height:400px;"></div>
    </section>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "familyBill",
      data() {
        return {
          chartPie: null,
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
          familyAccount: 0
        }
      },
      methods: {
        drawPieChart() {
          var _this = this
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
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
        drawCharts() {
          this.loadValue()
          setTimeout(() => {
            this.drawPieChart()
          }, 100)
        },
        loadValue() {
          var _this = this
          this.$http.get('http://localhost:8000/api/getFamilyValue?familyAccount=' +
            _this.$store.state.user.familyAccount)
            .then(response => {
              var resp = JSON.parse(response.bodyText)
              if(resp.error_num === 0){
                // alert(resp.statistics.food)
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
        loadFamilaAccount(){
          var _this = this
          this.$http.get('http://localhost:8000/api/login_memeber')
        }
      },
      mounted: function () {
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
