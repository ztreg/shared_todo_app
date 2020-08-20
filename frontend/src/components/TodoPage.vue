<template>
  <div>
    <q-form @submit="addTodo(todoTitle)" class="q-col-4" >
    <q-input filled v-model="todoTitle" label="Your todo *" />
    <div>
      <q-btn label="Add Todo" type="submit" color="primary" v-model="todoTitle"/>
    </div>
    </q-form>
    <q-list>
      <q-item>
        <q-item-section>Created at</q-item-section>
        <q-item-section>Updated at</q-item-section>
        <q-item-section>Delete Todo</q-item-section>
        <q-item-section>Todo Title</q-item-section>
        <q-item-section>Todo Status</q-item-section>
        <q-item-section>Todo Done</q-item-section>
        <q-item-section>Todo Edit</q-item-section>
      </q-item>
    </q-list>
    <q-list v-for="(todo, i) in todos" :key="i" class="parr bg-green-1 text-black">
       <q-item :id="todo._id">
         <q-item-section class="text-body1">{{ todo.createdAt }}</q-item-section>
         <q-item-section class="text-body1">{{ todo.updatedAt }}</q-item-section>
         <q-avatar clickable v-ripple color="red" text-color="white" icon="delete" class="q-ma-lg" @click="deleteTodo(todo._id)"/>
         <q-item-section class="text-body1">{{todo.title}}</q-item-section>
         <q-item-section class="text-body1">{{todo.done}}</q-item-section>
        <q-item-section>
          <div class="q-gutter-sm">
            <div>
              <q-checkbox v-model="todo.done" v-on:input="editTodo(todo.done, todo._id)"/>
            </div>
          </div>
        </q-item-section>
      <q-btn-dropdown class="glossy" color="green" icon="edit" size="sm">
      <div class="row no-wrap q-pa-md">
        <q-input v-model="todo.title" label="new title *" />
        <q-checkbox v-model="todo.done" v-on:input="editTodo(todo.done, todo._id)"/>
        <q-separator vertical inset class="q-mx-lg" />
        <div class="column items-center">
          <q-btn color="secondary" label="Send edit" push size="md" v-close-popup @click="editFullTodo(todo.title, todo.done, todo._id)" />
        </div>
      </div>
      </q-btn-dropdown>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { randomId } from '../../public/Test'
import moment from 'moment'
export default {
  name: 'TodoPage',
  data () {
    return {
      todos: [],
      todoTitle: null,
      val: null
    }
  },
  mounted () {
    this.fetchTodos()
    randomId()
  },
  methods: {
    /**
    * Get todos
    */
    async fetchTodos () {
      await fetch('http://localhost:8081')
        .then(response => response.json())
        .then((response) => {
          for (let i = 0; i < response.Todos.length; i++) {
            response.Todos[i].createdAt = Date.parse(response.Todos[i].createdAt)
            response.Todos[i].updatedAt = Date.parse(response.Todos[i].updatedAt)
            response.Todos[i].createdAt = moment(response.Todos[i].updatedAt).format('MM/DD hh:mm a')
            response.Todos[i].updatedAt = moment(response.Todos[i].updatedAt).format('MM/DD hh:mm a')
          }
          this.todos = response.Todos
          console.log(response.Todos)
        })
        .catch((error) => {
          console.error('There was a error fetching:', error)
        })
    },
    async editFullTodo (title, done, id) {
      console.log('making full edit request for id ' + id)
      await fetch('http://localhost:8081/update/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, done: done })
      }).then(res => res.json())
        .then(res => console.log(res))
    },
    /**
     * Add todo
     */
    async addTodo (title) {
      console.log('add todo with title ' + title)

      const data = await fetch('http://localhost:8081/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title })
      }).then(res => res.json())
      for (let i = 0; i < data.length; i++) {
        data.Todos[i].createdAt = Date.parse(data.Todos[i].createdAt)
        data.Todos[i].updatedAt = Date.parse(data.Todos[i].updatedAt)
        data.Todos[i].createdAt = moment(data.Todos[i].updatedAt).format('MM/DD hh:mm a')
        data.Todos[i].updatedAt = moment(data.Todos[i].updatedAt).format('MM/DD hh:mm a')
      }
      this.todos.push(data.lastId)
      this.todoTitle = ''
    },
    /**
     * Delete todo
     */
    async deleteTodo (id) {
      await fetch('http://localhost:8081/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      }).then(res => res.json())
        .then(res => console.log(res))
      const div = document.getElementById(id)
      div.parentNode.removeChild(div)
    },
    /**
     * Edit(check/uncheck) todo
     */
    async editTodo (done, id) {
      console.log('making put request for id ' + id)
      await fetch('http://localhost:8081/done/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: done })
      }).then(res => res.json())
        .then(res => console.log(res))
    }
  }
}
</script>

<style>

</style>
