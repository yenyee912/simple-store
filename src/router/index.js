import Vue from "vue"
import VueRouter from "vue-router"

import HarvestRow from "../views/OrderingByBin.vue"

import OrderHistory from "../views/CustomerOrderHistory.vue"
import CultivarList from "../views/CultivarList.vue"
import Login from "../views/CustomerLogin.vue"
// import Register from "../views/CustomerRegister.vue"
import VerifyPage from "../views/CustomerVerifyPage.vue"
import ForgetPass from "../views/CustomerForgotPass.vue"
import ResetPass from "../views/CustomerReset.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },

  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register
  // },
  {
    path: "/",
    name: "HarvestRow",
    component: HarvestRow,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/orderHistory",
    name: "CustomerOrderHistory",
    component: OrderHistory,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/verify",
    name: "Verify",
    component: VerifyPage,

  },
  {
    path: "/forgotpass",
    name: "ForgetPass",
    component: ForgetPass,
  },
  {
    path: "/resetpass",
    name: "ResetPass",
    component: ResetPass,

  },
  {
    path: "/list",
    name: "CultivarList",
    component: CultivarList,
    meta: {
      requiresAuth: true
    }
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user")
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
  next()

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router