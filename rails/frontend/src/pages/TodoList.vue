<template>
  <div class="q-pa-md center bg-grey-9 text-white">
    <TodoListComp></TodoListComp>
  </div>
</template>

<script>
import TodoListComp from '../components/TodoListComp'
export default {
  name: 'TodoList',
  data () {
    return {}
  },
  components: {
    TodoListComp
  }
}

</script>
