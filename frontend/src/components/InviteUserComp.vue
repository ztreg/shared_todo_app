<template>
    <q-btn-dropdown class="glossy float-right" color="grey" icon="edit" label="Invite users">
      <q-input v-on:input="fectchUsersSearch(searchUser)" label="Invite to todolist" v-model="searchUser" class="bg-white" style="width:300px">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-for="(user, i) in userList" :key="i">
        <div>{{ user.username }} <q-btn icon="user" class="on-right" @click="inviteUser(user._id)">Inv</q-btn> </div> 
      </div>
    </q-btn-dropdown>
</template>

<script>
export default {
    name: 'InviteUserComp',
    data () {
        return{
            searchUser: '',
            userList: ''
        }
    },
    methods: {
      async fectchUsersSearch (searchUserText) {
        await fetch(`http://localhost:8081/users?searchUserText=${searchUserText}`, {
          headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then((response) => {
          this.userList = []
          for (let i = 0; i < response.length; i++) {
              this.userList.push(response[i])
          }
          console.log(this.userList)
        })
        .catch((error) => {
          console.error('There was a error fetching:' + error)
        })
      },
      async inviteUser (userid) {
        const response = await fetch(`http://localhost:8081/todolist/${this.$route.params.id}?userToAdd=${userid}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
    }
  }
}
</script>

<style>

</style>
