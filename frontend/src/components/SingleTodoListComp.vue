<template>
  <div class="q-gutter-sm window-height">
    <div class="text-h5 text-center">Listname: {{ listname }} </div>
    <LogoutComponent></LogoutComponent>
    <InviteUserComp></InviteUserComp>
    <q-form @submit="addTodo(todoTitle)" class="row" >
    <q-input filled v-model="todoTitle" label="New todo *" class="col-5 bg-white text-h5" />
      <q-btn label="Add Todo" type="submit" color="green" v-model="todoTitle"/>
    </q-form>
    <q-list>
      <q-input v-on:input="fetchTodosSearch(searchtext)" label="Search here..." borderless v-model="searchtext" class="bg-white" style="width:300px">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn class="q-mr-md text-body1" color="accent" label="Sort by Created at" push @click="directionFunction(sorted = 'createdAt')" > </q-btn>
      <q-btn class="q-mr-md text-body1" color="cyan" label="Sort by Updated at " push @click="directionFunction(sorted = 'updatedAt')"> </q-btn>
      <q-item class="text-body1 q-pa-md text-center bg-grey-7">
         <q-item-section v-if="(auth.role === 'admin')">Todo Owner</q-item-section>
        <q-item-section>Created At</q-item-section>
        <q-item-section>Updated At</q-item-section>
        <q-item-section>Delete Todo</q-item-section>
        <q-item-section>Todo Title</q-item-section>
        <q-item-section>Todo Status</q-item-section>
        <q-item-section>Todo quickDone</q-item-section>
        <q-item-section>Todo Edit</q-item-section>
      </q-item>
      <div v-for="(todo, i) in todos" :key="i" class="parr q-pa-md text-body1 text-center">
       <q-item :id="todo._id" class="border">
         <q-item-section v-if="(auth.role === 'admin')" class="text-body2 text-weight-thin">{{ todo.userid }}</q-item-section>
         <q-item-section>{{ todo.createdAt }}</q-item-section>
         <q-item-section>{{ todo.updatedAt }}</q-item-section>
         <q-avatar clickable v-ripple color="red" text-color="white" icon="delete" class="" @click="deleteTodo(todo._id)"/>
         <q-item-section>{{todo.title}}</q-item-section>
         <q-item-section>{{todo.done}}</q-item-section>
         <q-item-section>
            <div class="q-gutter-sm">
                <q-checkbox v-model="todo.done" v-on:input="editFullTodo(todo.title, todo.done, todo._id)"/>
            </div>
          </q-item-section>
        <q-btn-dropdown class="glossy" color="green" icon="edit" label="Edit">
          <div class="row no-wrap q-pa-md">
            <q-input v-model="todo.title" label="new title *" autofocus />
            <q-checkbox color="white" v-model="todo.done" v-on:input="editFullTodo(todo.title, todo.done, todo._id)"/>
            <q-separator vertical inset class="q-mx-lg" />
            <div class="column items-center">
              <q-btn color="secondary" label="Send edit" push size="md" v-close-popup @click="editFullTodo(todo.title, todo.done, todo._id)"/>
            </div>
          </div>
        </q-btn-dropdown>
        </q-item>
      </div>
    </q-list>
    <div>Page: {{ this.page + 1 }} / {{ this.max }}</div>
    <q-avatar clickable v-ripple color="blue" text-color="white" icon="arrow_left"
      class="q-ma-lg" @click="fetchTodos(undefined, page--)"> </q-avatar>
    <q-avatar clickable v-ripple color="blue" text-color="white" icon="arrow_right"
      class="q-ma-lg" text="next page" @click="fetchTodos(undefined, page++)"/>
  </div>
</template>

<script>
import moment from 'moment'
import todoRequests from '../../public/todo'
import {mapGetters} from 'vuex'
import InviteUserComp from './InviteUserComp'
import LogoutComponent from './LogoutCompontent'
export default {
  name: 'SingleTodoListComp',
  data () {
    return {
      todos: [],
      todoTitle: null,
      val: null,
      sorted: 'createdAt',
      page: 0,
      direction: 'desc',
      max: Number,
      maxNmrOfPosts: Number,
      currentUser: '',
      searchtext: '',
      listname: ''
    }
  },
  components: {
    InviteUserComp,
    LogoutComponent
  },
  async created () {
    this.token = localStorage.getItem('token')
    process.env.TOKEN = this.token
    const dataListName = await todoRequests.fetchListName(this.$route.params.id)
    this.listname = dataListName.todoLists[0].title
    const data = await todoRequests.fetchTodos(this.sorted, this.direction, this.page, this.$route.params.id)
    this.todos = data.data
    this.max = Math.ceil(data.count / 5)
  },
  computed: {
    ...mapGetters(['auth'])
  },
  methods: {
    async directionFunction (sortFrom) {
      if (this.direction === 'asc') {
        this.direction = 'desc'
      } else {
        this.direction = 'asc'
      }
      console.log(sortFrom)
      const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page, this.$route.params.id)
      this.todos = data.data
    },
    async fetchTodos (sortFrom = 'createdAt', page = 0) {
      console.log(this.page)
      if (this.max <= this.page) {
        this.page = page
      } else if (this.page < 0) {
        this.page = 0
      } else {
        const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page, this.$route.params.id)
        this.sortFrom = sortFrom
        this.todos = data.data
      }
    },
    async editFullTodo (title, done, _id) {
      todoRequests.editFullTodo(title, done, _id, this.$route.params.id)
    },
    /**
    async addTodo (title) {
      // console.log(this.auth)
      // console.log(this.$route.params.id)
      await todoRequests.addTodo(title, this.$route.params.id)
      this.direction = 'asc'
      const sortFrom = 'createdAt'
      const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page, this.$route.params.id)
      this.todos = data.data
      this.todoTitle = ''
    },
     */
    async deleteTodo (id) {
      await todoRequests.deleteTodo(id, this.$route.params.id)
      //const div = document.getElementById(id)
      this.direction = 'desc'
      const sortFrom = 'createdAt'
      const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page, this.$route.params.id)
      this.todos = data.data
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('showUsers')
      localStorage.removeItem('role')
      this.$router.go( '/' )
    },
    async fetchTodosSearch (text) {
      console.log(text)
      const listId = this.$route.params.id
      await fetch(`http://localhost:8081/todo/search/${listId}?searchText=${text}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((response) => {
          console.log('k');
          console.log(response);
          for (let i = 0; i < response.length; i++) {
            console.log('i lop')
            response[i].createdAt = Date.parse(response[i].createdAt)
            response[i].updatedAt = Date.parse(response[i].updatedAt)
            response[i].createdAt = moment(response[i].updatedAt).format('MM/DD HH:mm')
            response[i].updatedAt = moment(response[i].updatedAt).format('MM/DD HH:mm')
          }
          //
          this.todos = []
          for (let i = 0; i < response.length; i++) {
            this.todos.push(response[i])
          }
          console.log(this.todos)
        })
        .catch((error) => {
          console.error('There was a error fetching:' + error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid white;
}
</style>
