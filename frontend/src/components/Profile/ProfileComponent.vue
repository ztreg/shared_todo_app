<template>
  <q-page>
    <div class="text-h4 text-center">All data on you</div>
    <q-btn class="float-right" label="Delete account" color="red" @click="deleteProfile()" ></q-btn>
      <q-btn-dropdown class="glossy q-ma-sm" color="green" icon="edit" label="Edit List">
        <div class="row no-wrap q-pa-md">
          <q-input v-model="newName" label="new username *" autofocus />
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-btn color="secondary" label="Update user" push size="md" v-close-popup @click="editUsername(newName)"/>
          </div>
        </div>
      </q-btn-dropdown>
    <p class="text-body1" v-if="allowedCookies"> You have allowed cookies on this site</p>

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
import UserRequests from '../../../public/userMethods'
export default {
  name: 'TodoArchive',
  props: {
    theuser: String
  },
  data () {
    return {
      token: '',
      name: '',
      allowedCookies: false,
      newUsername: ''
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    this.allowedCookies = localStorage.getItem('allowCokokie')
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
      const result = await fetch(`/api/users/${this.auth.userid}`, {
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
    },
    async editUsername (newUsername) {
      const result = await UserRequests.editUser(newUsername, this.auth.userid, this.token)
      console.log(result);
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
