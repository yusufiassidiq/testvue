<template>
    <nav id="nav">
        <ul>
            <!--UNLOGGED-->
            <div v-if="!$auth.check()">
            <li  v-for="(route, key) in routes.unlogged" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            </div>
            <!--LOGGED USER-->
            <div v-if="$auth.check(1)">
            <li  v-for="(route, key) in routes.user" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            </div>
            <!--LOGGED ADMIN-->
            <div v-if="$auth.check(2)">
            <li  v-for="(route, key) in routes.admin" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            </div>
            <!--LOGOUT-->
            <li v-if="$auth.check()">
                <a href="#" @click.prevent="$auth.logout();clearLocalStorage()">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    data() {
      return {
        routes: {
          // UNLOGGED
          unlogged: [
            {
              name: 'Register',
              path: 'register'
            },
            {
              name: 'Login',
              path: 'login'
            }
          ],          // LOGGED USER
          user: [
            {
              name: 'Dashboard',
              path: 'dashboard'
            }
          ],
          // LOGGED ADMIN
          admin: [
            {
              name: 'Dashboard',
              path: 'admin.dashboard'
            }
          ]
        }
      }
    },
    mounted() {
      //
    },
    methods: {
      clearLocalStorage(){
        localStorage.clear();
      }
    }
  }
</script>