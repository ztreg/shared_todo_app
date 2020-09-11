<template>
  <q-page>
    <div class="text-h4 text-center">All data on you</div>
    <q-btn class="float-right" label="Delete account" color="red" @click="deleteProfile()" ></q-btn>
    

    <div class="row">
    <ProfileAllTodos></ProfileAllTodos>
    <ProfileAllLists></ProfileAllLists>
    </div>
    <ProfileArchive></ProfileArchive>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileArchive from './ProfileArchive'
import ProfileAllTodos from './ProfileAllTodos'
import ProfileAllLists from './ProfileAllLists'
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
    ProfileArchive,
    ProfileAllTodos,
    ProfileAllLists
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-card {
    width: 100%;
    max-width: 350px;
  }

</style>
