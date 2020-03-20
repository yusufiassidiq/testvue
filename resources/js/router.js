import VueRouter from 'vue-router'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import UserDetails from './pages/admin/userDetails'
import UnverifiedDashboard from './pages/user/UnverifiedDashboard'


function axiosGet (url) {
  return axios.get(url)
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function isVerified() {
  var datatoken = []
  const url = "/user/getcustompayloads"
  const axiosTest = axios.get
  axiosTest(url).then(function(axiosTestResult){
    // datatoken.push(axiosTestResult.data)
    datatoken = axiosTestResult.data
    var status = (datatoken.confirmed)
    var baba = ''
    console.log(baba) 
    if(status === 0){
      baba = 'unverified'
      console.log(baba)
    }else{
      baba = ''
      console.log(baba)
    }
    return baba
    console.log(datatoken.email)
    console.log("kalomuncultandanyasukses")
  });
}

// Routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: undefined
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      auth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  // USER ROUTES
  {
    path: '/dashboard/',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(to.meta.requiresVerified) {
        console.log("dirouterjs")
         
          // var way = isVerified()
          // console.log(way)
          // console.log("1")
          // next(way)
          
        
        // console.log("2")
        // let token =  localStorage.getItem('token')
        // var asd = JSON.parse(localStorage.getItem('LS_STAT_KEY'))
        //nyoba custom payloads
        var datatoken = []
        const url = "/user/getcustompayloads"
        const axiosTest = axios.get
        axiosTest(url).then(function(axiosTestResult){
            // datatoken.push(axiosTestResult.data)
            datatoken = axiosTestResult.data
            var status = (datatoken.confirmed)
            if(status === 0){
              next('unverified')
            }else{
              next();
            }
            console.log(datatoken.email)
            console.log("kalomuncultandanyasukses")
        });
        // let qwe = datatoken.length
        // console.log(qwe)
        // var jwt = require('jsonwebtoken');
        // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        // var decoded = jwt.decode(token, {complete: true});
        // console.log(decoded.header);
        // console.log(decoded.payload)
        //nyoba custom payloads

        // if (asd === 0){
        //   next ('/unverified')
        // } else{
        //   next ();
        // }
        // console.log(asd)
        
      }
    },
    meta: {
      auth: true,
      requiresVerified: true,
    }
  },
  {
    path: '/unverified',
    name: 'unverifiedDashboard',
    component: UnverifiedDashboard,
    beforeEnter: (to, from, next) => {
      if(to.meta.requiresVerified) {
        var datatoken = []
        const url = "/user/getcustompayloads"
        const axiosTest = axios.get
        axiosTest(url).then(function(axiosTestResult){
        datatoken = axiosTestResult.data
        var status = (datatoken.confirmed)
        if(status === 1){
          next('dashboard')
        }else{
          next();
        }
        });
      }
    },
    meta: {
      auth: true,
      requiresVerified: true,
    }
  },
  // ADMIN ROUTES
  {
    path: '/admin',
    name: 'admin.dashboard',
    component: AdminDashboard,
    meta: {
      auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
    }
  },
  {
    path: '/:userId/details',
    name: 'userDetails',
    component: UserDetails,
    meta: {
      auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
    }
  }
]

// router.beforeEnter((to, from, next) => {
//   if(to.meta.requiresVerified) {
//     const authUser = JSON.parse(window.localStorage.getItem('User'))
//     console.log(authUser)
//     if(!authUser || !authUser.token) {
//       next({name:'login'})
//     }
//     else if(to.meta.adminAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//     if(authUser.data.role_id === 'ADMIN') {
//       next()
//     }else {
//       next('/resident')
//     }
//   } else if(to.meta.residentAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//     if(authUser.data.role_id === 'RESIDENT') {
//       next()
//     }else {
//       console.log('Im in admin')
//       next('/admin')
//     }
//   }
//   }else {
//   next()
//   }
// })

const router = new VueRouter({
  history: true,
  mode: 'history',
  routes,
})

export default router
  
  // data(){
  //   return {
  //     status : this.$route.params.status
  //   }
  // }
