import './bootstrap'

import Index from './Index'
import auth from './auth'
import router from './router'

// import dependecies tambahan
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';
import 'es6-promise/auto'
import VueAuth from '@websanova/vue-auth'

// Set Vue globally
window.Vue = require('vue');

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
Vue.use(VueAuth, auth)


// Load Index
Vue.component('index', Index)



// Vue.use(VueRouter,VueAxios,Axios);

// import file yang dibuat tadi
// import App from './components/App.vue';
// import Create from './components/Create.vue';
// import Read from './components/Read.vue';
// import Update from './components/Update.vue';

// membuat router
// const routes = [
//     {
//         name: 'read',
//         path: '/',
//         component: Read
//     },
//     {
//         name: 'create',
//         path: '/create',
//         component: Create
//     },
//     {
//         name: 'update',
//         path: '/detail/:id',
//         component: Update
//     }
// ]

// const router = new VueRouter({ mode: 'history', routes: routes });

const app = new Vue({
    el: '#app',
    router,
    // mounted() {
    //   this.$router.replace('/') // added this
    // }
  });

// new Vue(Vue.util.extend({ router }, App)).$mount("#app");