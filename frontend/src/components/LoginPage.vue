<template>
  <q-page class="bg-gray-8 window-height row justify-center items-center eybows">
    <div class="column login">
      <div class="">
        <h5 class="text-h5 text-white q-my-md">Todo Login</h5>
      </div>
      <div class="row">
      <!--<div class="col-3 col-sm-6">.col-3 .col-sm-6</div>
      <div class="col-3 col-sm-6">.col-3 .col-sm-6</div>-->
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-avatar icon="person_pin" color="blue-5" class="icon"/>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="username" type="username" label="username"/>
              <q-input square filled clearable v-model="password" type="password" label="password" />
              <p class="text-subtitle1 text-red q-pb-sm">{{ this.status }}</p>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" @click="login(username, password)"/>
          </q-card-actions>
          <q-card-section class="text-center text-body1">
            <q-btn :to="'/signup'" class="text-grey-6">Not reigistered? Create an Account</q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      token: '',
      currentUser: '',
      status: 'Log in to start todoing',
      role: '',
      allowCookies: false
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
    }
    if(localStorage.getItem('allowCokokie') === 'false') {
      this.allowCookies = localStorage.getItem('allowCokokie')
    } 
  },
  computed: {
    ...mapGetters(['auth'])
  },
  methods: {
    async login (username, password) {
      await fetch('http://localhost:8081/api/login/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then((response) => {
          console.log(response.response)
          this.status = response.response.msg
          this.token = response.response.token
          if (response.response.token) {
            process.env.TOKEN = this.token
            localStorage.token = this.token
            this.$router.push({ path: 'todolist' })
          }
        })
        .catch((error) => {
          console.error('There was a error fetching:', error)
        })
      // this.token = token
    }
  }
}
</script>

<style lang="scss">
.icon {
  margin: 0 auto !important;
  font-size: 6em;
}
.eybows {
  opacity: 1;
  background-image: url("https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&dpr=3&h=1000&w=310");
  background-color: #cccccc;
  max-height: 300px !important;
}
.login {
  opacity: 1 !important;
}
</style>
