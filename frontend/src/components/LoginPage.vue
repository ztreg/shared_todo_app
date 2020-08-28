<template>
  <q-page class="bg-secondary window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Todo Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="username" type="username" label="username" />
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
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      token: '',
      currentUser: '',
      status: 'Log in to start todoing',
      role: ''
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
    }
  },
  methods: {
    async login (username, password) {
      await fetch('http://localhost:8081/login/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then((response) => {
          this.status = response.msg
          this.token = response.token
          this.currentUser = username
          this.role = response.role
          if (response.token) {
            process.env.TOKEN = this.token
            localStorage.setItem('token', this.token)
            localStorage.setItem('username', this.currentUser)
            localStorage.token = this.token
            if (this.role === 'admin') {
              process.env.showUsers = true
            }
            this.$router.push({ path: 'todos' })
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

<style>

</style>
