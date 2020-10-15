<template>
  <div class="q-pa-md center bg-grey-9 text-white">
    <TodoPage></TodoPage>
  </div>
</template>

<script>
import TodoPage from '../components/TodoPage'
export default {
  name: 'Todos',
  data () {
    return {}
  },
  components: {
    TodoPage
  }
}

</script>
