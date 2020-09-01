<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-form @submit="addTodoList(todoListTitle)" class="row" >
    <q-input filled v-model="todoListTitle" label="New List of todos *" class="col-5 bg-white text-h5" />
      <q-btn label="Add TodoList" type="submit" color="green" v-model="todoListTitle"/>
    </q-form>

    <q-card class="my-card bg-primary text-white" v-for="(list, i) in this.allLists" :key="i">
      <q-card-section>
        <div class="text-h6">Title: {{ list.title }}</div>
        <div class="text-subtitle2">Creator: {{ list.creator}}</div>
      </q-card-section>

      <q-card-section>
        <q-btn flat :to="/todolist/+list._id"> click list to view todolist</q-btn>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
          <q-btn-dropdown class="glossy" color="green" icon="edit" label="Edit">
          <div class="row no-wrap q-pa-md">
            <q-input v-model="list.title" label="new title *" autofocus />
            <q-separator vertical inset class="q-mx-lg" />
            <div class="column items-center">
              <q-btn color="secondary" label="Send edit" push size="md" v-close-popup @click="editTodoList(list.title, list._id)"/>
            </div>
          </div>
        </q-btn-dropdown>
        <q-avatar clickable v-ripple color="red" text-color="white" icon="delete" class="" @click="deleteTodoList(list._id)"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import todoListRequests from '../../public/todoListMethods'
export default {
  name: 'TodoListComp',
  data () {
    return {
      todoListTitle: '',
      token: '',
      creator: '',
      allLists: []
    }
  },
  computed: {
    ...mapGetters(['auth'])
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    } else {
      this.$router.push({ path: '/' })
    }
    this.fetchList()
  },
  methods: {
    async fetchList () {
      const data = await todoListRequests.fetchList(this.token)
      this.allLists = data.todoLists
    },
    async addTodoList (todoListTitle) {
      await todoListRequests.addTodoList(todoListTitle, this.token)
      this.fetchList()
    },
    async editTodoList (title, id) {
      await todoListRequests.editTodoList(title, id, this.token)
      this.fetchList()
    },
    async deleteTodoList (id) {
      await todoListRequests.deleteTodoList(id, this.token)
      this.fetchList()
    }
  }
}
</script>

<style>

</style>
