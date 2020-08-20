<template>
  <div class="q-pa-md center">
    <h3>Jonas Todo List</h3>
    <q-form @submit="addTodo(todoTitle)" class="q-gutter-md" >
      <q-input filled v-model="todoTitle" label="Your todo *" />
      <div>
        <q-btn label="Add Todo" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-list>
       <q-item>
         <q-item-section class="text-h5">Titel</q-item-section>
         <q-item-section class="text-h5">Done</q-item-section>
          <q-item-section class="text-h5">Check</q-item-section>
      </q-item>
    </q-list>
    <q-list v-for="(todo, i) in todos" :key="i" class="">
       <q-item>
         <q-item-section>{{todo.title}}</q-item-section>
         <q-item-section>{{todo.done}}</q-item-section>
        <q-item-section>
          <q-avatar v-if="(todo.done === true)" avatar clickable v-ripple color="teal" text-color="white" icon="done" @click="onSubmit(todo._id)"/>
          <q-avatar v-else avatar clickable v-ripple color="teal" text-color="white" icon="cancel" @click="checkTodo(todo._id)"/>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      todos: [],
      todoTitle: null
    }
  },
  mounted () {
    this.fetchTodos()
  },
  methods: {
    fetchTodos () {
      fetch('http://localhost:8081')
        .then(response => response.json())
        .then((response) => {
          this.todos = response.Todos
          console.log(response.Todos)
        })
        .catch((error) => {
          console.error('There was a error fetching:', error)
        })
    },
    checkTodo (id) {
      console.log('check off todo with id ' + id)
    },
    async addTodo (title) {
      console.log('add todo with title ' + title)

      await fetch('http://localhost:8081/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      }).then(res => res.json())
        .then(res => console.log(res))
    }
  }
}

</script>

<style lang="scss" scoped>
.center {
  margin: 0 auto;
}
</style>
