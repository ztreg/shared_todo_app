<template>
  <q-page>
    <q-btn class="" label="Delete account" color="red" @click="deleteProfile()" ></q-btn>
    <ProfileArchive></ProfileArchive>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileArchive from './ProfileArchive'
export default {
  name: 'TodoArchive',
  props: {
    theuser: String
  },
  data () {
    return {
      token: '',
      name: ''
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
  },
  computed: {
    ...mapGetters(['auth'])
  },
  components: {
    ProfileArchive
  },
  methods: {
    async deleteProfile () {
      const result = await fetch(`http://localhost:8081/users/${this.auth.userid}`, {
       method: 'DELETE',
       headers: {
          Authorization: `Bearer ${this.token}`,
         'Content-Type': 'application/json'
       }
      })
      console.log(result);
      localStorage.removeItem('token')
      localStorage.removeItem('showUsers')
      localStorage.removeItem('role')
      this.$router.go( '/' )
      //return await fetch(`http://localhost:8081/users/${id}`, {
      //  method: 'DELETE',
      //  headers: {
      //    Authorization: `Bearer ${this.token}`,
      //    'Content-Type': 'application/json'
      //  }
      //})
    }//
  }
}
</script>

<style lang="scss" scoped>
  .my-card {
    width: 100%;
    max-width: 350px;
  }

</style>
