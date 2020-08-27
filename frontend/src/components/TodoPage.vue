<template>
  <div class="q-gutter-sm">
    <q-btn class="float-right" label="Logout" color="red" @click="logOut()"></q-btn>
    <q-form @submit="addTodo(todoTitle)" class="row" >
    <q-input filled v-model="todoTitle" label="New todo *" class="col-3 bg-white text-h5" />
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
      <q-item class="text-body1 q-pa-md text-center">
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
         <q-item-section v-if="todo.username">hi</q-item-section>
         <q-item-section>{{ todo.createdAt }}</q-item-section>
         <q-item-section>{{ todo.updatedAt }}</q-item-section>
         <q-avatar clickable v-ripple color="red" text-color="white" icon="delete" class="" @click="deleteTodo(todo._id)"/>
         <q-item-section>{{todo.title}}</q-item-section>
         <q-item-section>{{todo.done}}</q-item-section>
         <q-item-section>
            <div class="q-gutter-sm">
                <q-checkbox v-model="todo.done" v-on:input="quickEditTodo(todo.done, todo._id)"/>
            </div>
          </q-item-section>
        <q-btn-dropdown class="glossy" color="green" icon="edit" label="Edit">
          <div class="row no-wrap q-pa-md">
            <q-input v-model="todo.title" label="new title *" autofocus />
            <q-checkbox color="white" v-model="todo.done" v-on:input="quickEditTodo(todo.done, todo._id)"/>
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
    <div class="text-white">Logged in as: {{ currentUser }}</div>
  </div>
</template>

<script>
// import moment from 'moment'
import todoRequests from '../../public/todo'
export default {
  name: 'TodoPage',
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
      searchtext: ''
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.currentUser = localStorage.getItem('username')
      this.token = localStorage.getItem('token')
      process.env.TOKEN = this.token
    } else {
      this.$router.push({ path: '/' })
    }
  },
  async mounted () {
    const data = await todoRequests.fetchTodos(this.sorted, this.direction, this.page)
    this.todos = data.data
    this.max = Math.ceil(data.count / 5)
  },
  methods: {
    /**
     * Adjust direction if same button is pressed twice, then make a fetch with new direction
     */
    async directionFunction (sortFrom) {
      if (this.direction === 'asc') {
        this.direction = 'desc'
      } else {
        this.direction = 'asc'
      }
      console.log(sortFrom)
      const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page)
      this.todos = data.data
    },
    /**
    * Get todos
    */
    async fetchTodos (sortFrom = 'createdAt', page = 0, searchtext = '') {
      console.log(this.page)
      if (this.max <= this.page) {
        this.page = page
      } else if (this.page < 0) {
        this.page = 0
      } else {
        console.log('frontendpage ' + page)
        const data = await todoRequests.fetchTodos(sortFrom, this.direction, this.page)
        this.todos = data.data
      }
    },
    /**
     * Edit the todos, full edit
     */
    async editFullTodo (title, done, _id) {
      todoRequests.editFullTodo(title, done, _id)
    },
    /**
     * Add todo, send to class method and format date response
     */
    async addTodo (title) {
      const data = await todoRequests.addTodo(title)
      /**
      * Fetch the newest
      */
      console.log(data)
      this.fetchTodos()
      this.todoTitle = ''
    },
    /**
     * Delete todo
     */
    async deleteTodo (id) {
      await todoRequests.deleteTodo(id)
      const div = document.getElementById(id)
      div.parentNode.removeChild(div)
    },
    /**
     * Edit(check/uncheck) todo
     */
    async quickEditTodo (done, id) {
      await todoRequests.quickEditTodo(done, id)
    },
    logOut () {
      localStorage.setItem('token', '')
      this.$router.push({ path: '/' })
    },
    async fetchTodosSearch (text) {
      await fetch('http://localhost:8081/todo/' + text, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((response) => {
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
