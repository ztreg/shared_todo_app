<template>
  <div class="q-pa-md center bg-grey-9 text-white">
    <ProfileComponent></ProfileComponent>
  </div>
</template>

<script>
import ProfileComponent from '../components/Profile/ProfileComponent'
export default {
  name: 'LoginPage',
  data () {
    return {}
  },
  components: {
    ProfileComponent
  }
}

</script>
