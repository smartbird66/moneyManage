import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/login'
import userLogin from "../components/userLogin";
import userManage from "../components/userManage";
import home from "../components/home";
import billIndex from "../components/bill/billIndex";
import billTable from "../components/bill/billTable";
import billPicture from "../components/bill/billPicture";
import billManage from "../components/bill/billManage";
import billBudget from "../components/bill/billBudget";
import familyBill from "../components/bill/familyBill";
import borrowInAndOut from "../components/myTool/borrowInAndOut";
import investment from "../components/myTool/investment";
import notes from "../components/myTool/notes";
import chatroom from "../components/chatroom";
import personCenter from "../components/personCenter";
import superManage from "../components/superManage";
// var axios = require('axios')
// axios.default.baseUrl='http://localhost:8080/api'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
        path: '/helloWorld',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
          requireAuth: true
        }
        },
        {
          path: '/billIndex',
          name: 'billIndex',
          component: billIndex,
          children: [
            {
              path: '/billTable',
              name: 'billTable',
              component: billTable,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/billPicture',
              name: 'billPicture',
              component: billPicture
            },
            {
              path: '/billManage',
              name: 'billManage',
              component: billManage
            },
            {
              path: '/billBudget',
              name: 'billBudget',
              component: billBudget
            },
            {
              path: '/familyBill',
              name: 'familyBill',
              component: familyBill
            }
          ]
        },
        {
          path: '/borrowInAndOut',
          name: 'borrowInAndOut',
          component: borrowInAndOut
        },
        {
          path: '/investment',
          name: 'investment',
          component: investment
        },
        {
          path: '/notes',
          name: 'notes',
          component: notes
        },
        {
          path: '/chatroom',
          name: 'chatroom',
          component: chatroom
        },
        {
          path: '/personCenter',
          name: 'personCenter',
          component: personCenter
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: userManage
    },
    {
      path: '/superManage',
      name: 'superManage',
      component: superManage
    }
  ]
})
