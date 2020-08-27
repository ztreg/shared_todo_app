<template>
  <div class="q-pa-md center bg-grey-9 text-white">
    <CreateAccount></CreateAccount>
  </div>
</template>

<script>
import CreateAccount from '../components/CreateAccount'
export default {
  name: 'Login',
  data () {
    return {}
  },
  components: {
    CreateAccount
  }
}

</script>
