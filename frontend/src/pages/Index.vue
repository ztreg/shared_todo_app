<template>
  <div class="q-pa-md center bg-grey-1">
    <h3>Jonas Todo List</h3>
    <TodoPage></TodoPage>
  </div>
</template>

<script>
import TodoPage from '../components/TodoPage'
export default {
  name: 'PageIndex',
  data () {
    return {}
  },
  components: {
    TodoPage
  }
}

</script>
