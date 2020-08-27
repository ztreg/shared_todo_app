<template>
<q-page class="bg-info window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Todo Signup</h5>
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
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Signup" @click="signup(username, password)"/>
          </q-card-actions>
          <q-card-section class="text-center text-body1">
            <q-btn :to="'/'" class="text-grey-6">Already signed up? Log in here</q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'CreateAccount',
  data () {
    return {
      username: '',
      password: '',
      status: ''
    }
  },
  methods: {
    async signup (username, password) {
      await fetch('http://localhost:8081/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then((response) => {
          console.log(response)
          this.status = response.msg
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
